const router = require("express").Router();
const Order = require("../models/order");
const auth = require("../util");
const paginationPage = require("../config/paginationPage");

const isAuth = auth.isAuth;
const isAdmin = auth.isAdmin;
const pagination = paginationPage.pagination;

router.get("/", isAuth, isAdmin, pagination(Order), async (req, res) => {
  res.send(res.pagination);
});

// router.get("/delete", async (req, res) => {
//   const order = await Order.remove({});
//   res.json(order);
// });

router.post("/add", isAuth, async (req, res) => {
  const { cart, address } = req.body;

  var order = new Order({
    id_user: req.user._id,
    cart: cart,
    address: address,
    status: 0,
  });

  try {
    const orderSave = await order.save();

    if (orderSave) {
      res.send({ success: true, order });
    }
  } catch (error) {
    res.send({ success: false, error });
  }
});

router.post("/changeState/:id", isAuth, isAdmin, async (req, res) => {
  const id = req.params.id;
  const { nextState } = req.body;

  try {
    const order = await Order.findById(id);
    console.log(order);
    if (order) {
      order.status = nextState;
      const orderSave = await order.save();
      if (orderSave) return res.send({ success: true, order: orderSave });
      else return res.send({ success: false, err: "Fail" });
    } else {
      res.send({ success: false, err: "Order not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
