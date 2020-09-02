import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
  CART_REMOVE_ALL_ITEM,
} from "../constants/cartConstants";

import Cookie from "js-cookie";
import productApi from "../api/productApi";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const data = await productApi.get(productId);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        title: data.title,
        image: data.image,
        price: data.price,
        //countInStock: data.countInStock,
        qty,
      },
    });
    //set cookie
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.log(error);
  }
};

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

const removeAllItem = () => (dispatch, getState) => {
  Cookie.remove("cartItems");
  dispatch({ type: CART_REMOVE_ALL_ITEM });
  const {
    cart: { cartItems },
  } = getState();

  console.log(cartItems);
};

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};

// const orderCart = (order) => async (dispatch) => {
//   try {
//     console.log(order);
//     dispatch({ type: CART_ORDER_REQUEST, payload: order });
//     const data = await orderApi.addOrder(order);
//     if (data.success) {
//       dispatch({ type: CART_ORDER_SUCCESS, payload: data });
//     } else {
//       dispatch({ type: CART_ORDER_FAIL, payload: data });
//     }
//   } catch (error) {
//     dispatch({ type: CART_ORDER_FAIL, payload: error });
//   }
// };

export { addToCart, removeFromCart, saveShipping, savePayment, removeAllItem };
