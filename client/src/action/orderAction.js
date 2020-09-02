import orderApi from "../api/orderApi";
import {
  ORDER_ADD_REQUEST,
  ORDER_ADD_SUCCESS,
  ORDER_ADD_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_CHANGE_STATE_REQUEST,
  ORDER_CHANGE_STATE_SUCCESS,
  ORDER_CHANGE_STATE_FAIL,
} from "../constants/orderConstants";
import Cookie from "js-cookie";
import { CART_REMOVE_ALL_ITEM } from "../constants/cartConstants";

const orderAddCart = (order) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_ADD_REQUEST, payload: order });
    const data = await orderApi.addOrder(order);
    if (data.success) {
      dispatch({ type: ORDER_ADD_SUCCESS, payload: data });
      dispatch({ type: CART_REMOVE_ALL_ITEM });
      Cookie.remove("cartItems");
    } else {
      dispatch({ type: ORDER_ADD_FAIL, payload: data });
    }
  } catch (error) {
    dispatch({ type: ORDER_ADD_FAIL, payload: error });
  }
};

const orderList = (query) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const data = await orderApi.listOrder(query);
    //if (data.length > 0) {
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    // } else {
    //   dispatch({ type: ORDER_LIST_FAIL, payload: "Not Found" });
    // }
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error });
  }
};

const orderChangeStatus = (idOrder, nextState) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CHANGE_STATE_REQUEST });
    const data = await orderApi.changeStateOrder(idOrder, nextState);
    if (data.success) {
      dispatch({ type: ORDER_CHANGE_STATE_SUCCESS, payload: data });
    } else {
      dispatch({ type: ORDER_CHANGE_STATE_FAIL, payload: data });
    }
  } catch (error) {
    dispatch({ type: ORDER_CHANGE_STATE_FAIL, payload: error });
  }
};

export { orderAddCart, orderList, orderChangeStatus };
