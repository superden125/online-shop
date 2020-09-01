var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Page = require("../models/page");
const auth = require("../config/auth");

const isAdmin = auth.isAdmin;

// router.get('/', isAdmin, function (req, res) {
//    Page.find({}).sort({
//       sorting: 1
//    }).exec((err, pages) => {
//       res.render('admin/page', {
//          pages: pages,
//          layout: 'layout/admin_layout'
//       })
//    })
// });

// router.get("/add-page", isAdmin, function (req, res) {
//   var title = "";
//   var slug = "";
//   var content = "";

//   res.render("admin/add_page", {
//     layout: "layout/admin_layout",
//     title: title,
//     slug: slug,
//     content: content,
//   });
// });

router.post("/add-page", function (req, res) {
  req.checkBody("title", "Title is not empty").notEmpty();
  req.checkBody("content", "Content is not empty").notEmpty();

  var title = req.body.title;
  var slug = req.body.slug.replace(/\s/g, "-").toLowerCase();
  if (slug == "") slug = title.replace(/\s/g, "-").toLowerCase();
  var content = req.body.content;

  var errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    res.render("admin/add_page", {
      layout: "layout/admin_layout",
      title: title,
      slug: slug,
      content: content,
      errors: errors,
    });
  } else {
    Page.findOne(
      {
        slug: slug,
      },
      (err, page) => {
        if (page) {
          req.flash("error", "Page slug exist");
          res.render("admin/add_page", {
            layout: "layout/admin_layout",
            title: title,
            slug: slug,
            content: content,
          });
        } else {
          var page = new Page({
            title: title,
            slug: slug,
            content: content,
            sorting: 100,
          });
          page.save((err) => {
            if (err) return console.log(err);
            updateSortPages(req);
            req.flash("success_msg", "Page added!");
            res.redirect("/admin/page");
          });
        }
      }
    );
  }
});

router.post("/reorder-page", (req, res) => {
  var ids = req.body["id[]"];

  sortPages(ids, () => {
    Page.find({})
      .sort({
        sorting: 1,
      })
      .exec((err, pages) => {
        if (err) console.log(err);
        else {
          req.app.locals.pages = pages;
        }
      });
  });
});

function updateSortPages(req) {
  Page.find({})
    .sort({
      sorting: 1,
    })
    .exec((err, pages) => {
      if (err) console.log(err);
      else {
        req.app.locals.pages = pages;
      }
    });
}

function sortPages(ids, callback) {
  var count = 0;
  for (var i = 0; i < ids.length; i++) {
    var id = ids[i];
    count++;

    (function (count) {
      Page.findById(id, (err, page) => {
        page.sorting = count;
        page.save((err) => {
          if (err) return console.log(err);
          count++;
          if (count >= ids.length) {
            callback();
          }
        });
      });
    })(count);
  }
}

router.get("/edit-page/:id", isAdmin, function (req, res) {
  Page.findById(req.params.id, (err, page) => {
    if (err) res.status(404).json({ err: "Page Not Found" });

    res.status(200).json(page);

    //     res.render("admin/edit_page", {
    //       title: page.title,
    //       slug: page.slug,
    //       content: page.content,
    //       id: page._id,
    //       layout: "layout/admin_layout",
    //     });
  });
});

router.post("/edit-page/:id", (req, res) => {
  req.checkBody("title", "Title is not empty").notEmpty();
  req.checkBody("content", "Content is not empty").notEmpty();

  var title = req.body.title;
  var slug = req.body.slug.replace(/\s/g, "-").toLowerCase();
  if (slug == "") slug = title.replace(/\s/g, "-").toLowerCase();
  var content = req.body.content;
  var id = req.params.id;

  var errors = req.validationErrors();

  if (errors) {
    res.status(401).json({ err: errors });
    //  res.render("admin/edit_page", {
    //    layout: "layout/admin_layout",
    //    title: title,
    //    slug: slug,
    //    content: content,
    //    errors: errors,
    //    id: id,
    //  });
  } else {
    Page.findOne(
      {
        slug: slug,
        _id: {
          $ne: id,
        },
      },
      (err, page) => {
        if (page) {
          res.status(401).json({ err: "Page existed!" });
        } else {
          Page.findById(id, (err, page) => {
            if (err) {
              return console.log(err);
            }

            page.title = title;
            page.slug = slug;
            page.content = content;
            page.save((err) => {
              if (err) return console.log(err);
              updateSortPages(req);
              res.status(200).send({ msg: "Edited!" });
            });
          });
        }
      }
    );
  }
});

router.delete("/delete/:id", (req, res) => {
  Page.deleteOne(
    {
      _id: req.params.id,
    },
    (err) => {
      if (err) res.status(401).send({ err: "Delete Fail!" });
      else {
        updateSortPages(req);
        res.status(200).send({ msg: "Deleted!" });
      }
    }
  );
});

module.exports = router;
