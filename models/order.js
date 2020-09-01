const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  id_user: {
    type: String,
    require: true,
  },
  cart: {
    type: Array,
    require: true,
  },
  address: {
    type: Object,
    require: true,
  },
  status: {
    type: Number,
    /*0: xu li - waiting process
      1: giao hang - shipping
      2: return
      3: fail 
      4: Hoan thanh - finished
    */
    require: true,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", OrderSchema);
