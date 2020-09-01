const router = require("express").Router();
const mkdirp = require("mkdirp");
const fs = require("fs-extra");
//const resizeImg = require("resize-img");
const auth = require("../util");

const changeViet = require("../config/convertViet");

const isAdmin = auth.isAdmin;
const isAuth = auth.isAuth;

const Product = require("../models/product");
const Category = require("../models/category");

router.get("/", (req, res) => {
  Product.find((err, products) => {
    if (err) return console.log(err);

    res.send(products);
  });
});

router.post("/add", isAuth, isAdmin, (req, res) => {
  var imageFile = "";
  if (req.files != null) {
    imageFile = req.files.image.name;
  }
  var title = req.body.title;
  var slug = changeViet(title);
  var desc = req.body.desc;
  var prices = req.body.price;
  var category = req.body.category;

  Product.findOne(
    {
      slug: slug,
    },
    (err, product) => {
      if (product) {
        res.send({ success: false, err: "Product title existed!" });
      } else {
        var price = parseFloat(price).toFixed(2);
        var product = new Product({
          title: title,
          slug: slug,
          desc: desc,
          price: prices,
          category: category,
          image: imageFile,
        });

        product.save((err, doc) => {
          if (err) return console.log(err);

          mkdirp.sync("public/product_images/" + product._id);
          mkdirp.sync("public/product_images/" + product._id + "/gallery");
          mkdirp.sync(
            "public/product_images/" + product._id + "/gallery/thumbs"
          );

          if (imageFile != "") {
            var productImage = req.files.image;
            var id = product._id;
            var path = "public/product_images/" + id + "/" + imageFile;
            //console.log(path);

            productImage.mv(path, (err) => {
              // return console.log(err)
              if (err) console.log(err);
            });
          }

          res.send({ success: true, product });
        });
      }
    }
  );
});

router.post("/edit/:id", isAuth, isAdmin, (req, res) => {
  console.log(req.body);
  console.log(req.files);
  var imageFile = "";
  if (req.files != null) {
    imageFile = req.files.new_image.name;
  }

  var title = req.body.title;
  var slug = changeViet(title);
  var desc = req.body.desc;
  var price = req.body.price;
  var category = req.body.category;
  var pimage = req.body.image;
  var id = req.params.id;

  Product.findOne(
    {
      slug: slug,
      _id: {
        $ne: id,
      },
    },
    (err, product) => {
      if (err) console.log(err);

      if (product) {
        res.send({ success: false, err: "Product title exists!" });
      } else {
        Product.findById(id, (err, product) => {
          if (err) console.log(err);

          product.title = title;
          product.slug = slug;
          product.desc = desc;
          product.price = parseFloat(price).toFixed(2);
          product.category = category;
          if (imageFile != "") {
            product.image = imageFile;
          }
          product.save((err) => {
            if (err) console.log(err);
            if (imageFile != "") {
              if (pimage != "") {
                fs.remove(
                  "public/product_images/" + id + "/" + pimage,
                  (err) => {
                    if (err) console.log(err);
                  }
                );
              }
              var productImage = req.files.new_image;

              var path = "public/product_images/" + id + "/" + imageFile;

              productImage.mv(path, (err) => {
                // return console.log(err)
                if (err) console.log(err);
              });
            }
            //   req.flash("success_msg", "Update Success");
            //   res.redirect("/admin/product/edit-product/" + id);
            res.send({ success: true, product });
          });
        });
      }
    }
  );
});

router.post("/product-gallery/:id", isAuth, isAdmin, (req, res) => {
  var productImage = req.files.file;
  var id = req.params.id;
  var path = "public/product_images/" + id + "/gallery/" + req.files.file.name;
  var thumbsPath =
    "public/product_images/" + id + "/gallery/thumbs/" + req.files.file.name;

  productImage.mv(path, (err) => {
    if (err) console.log(err);

    resizeImg(fs.readFileSync(path), {
      width: 100,
      height: 100,
    }).then((buf) => {
      fs.writeFileSync(thumbsPath, buf);
    });
  });
  res.sendStatus(200);
});

router.get("/delete-image/:image", isAdmin, (req, res) => {
  var id = req.query.id;
  var path = "public/product_images/" + id + "/gallery/" + req.params.image;
  var thumbsPath =
    "public/product_images/" + id + "/gallery/thumbs/" + req.params.image;

  fs.remove(path, (err) => {
    if (err) console.log(err);
    else {
      fs.remove(thumbsPath, (err) => {
        if (err) console.log(err);
        else {
          req.flash("success_msg", "Delete Image Gallery Success");
          res.redirect("/admin/product/edit-product/" + id);
        }
      });
    }
  });
});

router.delete("/delete/:id", isAuth, isAdmin, (req, res) => {
  var id = req.params.id;
  var path = "public/product_images/" + id;

  fs.remove(path, (err) => {
    if (err) {
      console.log(err);
      res.json({
        success: false,
      });
    } else {
      Product.findByIdAndRemove(id, (err) => {
        console.log(err);
      });

      res.json({
        success: true,
      });
    }
  });
});

module.exports = router;
