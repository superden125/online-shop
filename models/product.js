const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
  },
  category: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  image: {
    type: String,
  },
  desc: {
    type: String,
    require: true,
  },
});

ProductSchema.index(
  {
    slug: "text",
    desc: "text",
  },
  {
    weights: {
      slug: 5,
      desc: 1,
    },
  }
);

module.exports = mongoose.model("Product", ProductSchema);
