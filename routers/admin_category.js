const router = require("express").Router();
const Category = require("../models/category");
const auth = require("../util");
const changeViet = require("../config/convertViet");

const isAdmin = auth.isAdmin;
const isAuth = auth.isAuth;

router.get("/", (req, res) => {
  Category.find((err, categories) => {
    if (err) return console.log(err);

    res.send(categories);
  });
});

router.post("/add", isAuth, isAdmin, (req, res) => {
  var title = req.body.title;
  var slug = changeViet(title);
  slug = slug.replace(/\s/g, "-").toLowerCase();

  Category.findOne(
    {
      slug: slug,
    },
    (err, category) => {
      if (category) {
        res.send({
          success: false,
          err: "Title existed! Please choose another title!",
        });
      } else {
        var category = new Category({
          title: title,
          slug: slug,
        });
        category.save((err) => {
          {
            if (err) return console.log(err);

            res.send({ success: true });
          }
        });
      }
    }
  );
});

router.post("/edit/:id", isAuth, isAdmin, (req, res) => {
  var title = req.body.title;
  var slug = changeViet(title);
  slug = slug.replace(/\s/g, "-").toLowerCase();
  var id = req.params.id;

  Category.findOne(
    {
      slug: slug,
      _id: {
        $ne: id,
      },
    },
    (err, page) => {
      if (page) {
        res.send({
          success: false,
          error: "Title existed! Please choose another title!",
        });
      } else {
        Category.findById(id, (err, page) => {
          if (err) {
            return console.log(err);
          }

          page.title = title;
          page.slug = slug;

          page.save((err) => {
            if (err) return console.log(err);
            res.send({ success: true });
          });
        });
      }
    }
  );
});

router.delete("/delete/:id", isAuth, isAdmin, (req, res) => {
  Category.deleteOne(
    {
      _id: req.params.id,
    },
    (err) => {
      if (err)
        res.json({
          success: false,
        });
      else {
        res.json({
          success: true,
        });
      }
    }
  );
});

module.exports = router;
