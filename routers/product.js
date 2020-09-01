const router = require("express").Router();
const fs = require("fs-extra");
const Product = require("../models/product");
const Category = require("../models/category");
const auth = require("../config/passport");
const paginationPage = require("../config/paginationPage");
const { paginationPa } = require("../config/pagination");

const isUser = auth.isUser;
const pagination = paginationPage.pagination;

//get all product
// router.get("/", pagination(Product), (req, res) => {
//   res.json(res.pagination);
// });

router.get("/", async (req, res) => {
  const limit = req.query.limit ? req.query.limit : 4;
  const page = req.query.page ? req.query.page : 1;
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const order = req.query.order ? req.query.order : -1;
  const category = req.query.category ? req.query.category : "";
  const priceQuery = req.query.price ? req.query.price : null;
  const searchTerm = req.query.searchTerm;
  let price;
  if (priceQuery) {
    price = Array.isArray(priceQuery) ? priceQuery : [0, parseInt(priceQuery)];
  }

  const orderArgs = [[sortBy, order]];
  let findArgs = {};

  if (category) findArgs["category"] = category;
  if (price) findArgs["price"] = { $gte: price[0], $lte: price[1] };

  console.log("find", findArgs);
  const pa = await paginationPa(
    Product,
    page,
    limit,
    findArgs,
    orderArgs,
    searchTerm
  );
  //console.log(pa);
  pa.error ? res.status(500).send(pa.error) : res.send(pa);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.send(product);
  res.send({ success: false, err: "Product Not Found!" });
});

//get product by category
router.get("/:category", async (req, res) => {
  var category = req.params.category;

  Category.find(
    {
      slug: category,
    },
    (err, doc) => {
      Product.find(
        {
          category: category,
        },
        (err, products) => {
          if (err) console.log(err);
          res.send(products);
        }
      );
    }
  );
});

//get product detail
//get product by category
router.get("/:category/:product", (req, res) => {
  var galleryImages = null;
  var loggedIn = req.isAuthenticated() ? true : false;

  Product.findOne(
    {
      slug: req.params.product,
    },
    (err, product) => {
      if (err) console.log(err);
      else {
        var galleryDir = "public/product_images/" + product._id + "/gallery";
        fs.readdir(galleryDir, (err, files) => {
          if (err) console.log(err);
          else {
            galleryImages = files;
            res.render("product", {
              title: product.title,
              product: product,
              galleryImages: galleryImages,
              layout: "layout/main_layout",
              loggedIn,
            });
          }
        });
      }
    }
  );
});

// function pagination(model) {
//   return async (req, res, next) => {
//     const page = req.query.page;
//     const limit = req.query.limit;

//     const startIndex = (page - 1) * limit;

//     const resultData = await model.find({});

//     const totalRow = Math.ceil(resultData.length / limit);

//     const result = {};
//     result.pagination = {
//       totalRow,
//       page: parseInt(page),
//       limit: parseInt(limit),
//     };

//     try {
//       result.results = await model
//         .find()
//         .limit(parseInt(limit))
//         .skip(startIndex)
//         .exec();

//       res.pagination = result;
//       next();
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
// }

module.exports = router;
