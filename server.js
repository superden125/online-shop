var express = require("express");
var path = require("path");
var logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const passport = require("passport");
const cors = require("cors");

var pageRouter = require("./routers/page");
var usersRouter = require("./routers/users");
// const adminPageRouter = require("./routes/admin_page");
const adminCategoryRouter = require("./routers/admin_category");
const adminProductRouter = require("./routers/admin_product");
const product = require("./routers/product");
const order = require("./routers/order");
// const cart = require("./routes/cart");

var app = express();
const PORT = process.env.PORT || 3080;

require("dotenv/config");

//Get Page Model
var Page = require("./models/page");
//Get all page
Page.find({})
  .sort({
    sorting: 1,
  })
  .exec((err, pages) => {
    if (err) console.log(err);
    else {
      app.locals.pages = pages;
    }
  });

//Get Page Model
var Category = require("./models/category");

//Get all page
Category.find((err, doc) => {
  if (err) console.log(err);
  else {
    app.locals.category = doc;
  }
});

app.use(fileUpload());

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//passort config
require("./config/passport")(passport);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// app.get("*", (req, res, next) => {
//   res.locals.cart = req.session.cart;
//   res.locals.user = req.user || null;
//   next();
// });

app.use("/public", express.static(path.join(__dirname, "public")));

//app.use("/", pageRouter);
app.use("/user", usersRouter);
// app.use("/admin/page", adminPageRouter);
app.use("/admin/category", adminCategoryRouter);
app.use("/admin/product", adminProductRouter);
app.use("/product", product);
app.use("/order", order);
// app.use("/cart", cart);

mongoose.connect(
  process.env.MONGODB_URI || process.env.DB_CONNECTION,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("Connected to DB");
  }
);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
