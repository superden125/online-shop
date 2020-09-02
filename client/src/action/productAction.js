import productApi from "../api/productApi";

const axios = require("axios");
const {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_SAVE_EDIT_SUCCESS,
} = require("../constants/productConstants");

const listProduct = (query) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const data = await productApi.getAll(query);

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const detailProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST, payload: productId });
    const data = await productApi.get(productId);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error.message });
  }
};

const saveProduct = (product, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });

    if (!id) {
      const data = await productApi.add(product);
      if (data.success) {
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      } else {
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: data.err });
      }
    } else {
      const data = await productApi.edit(product, id);
      // const { data } = await axios.post("/admin/product/edit/" + id, product, {
      //   headers: { "Content-Type": "multipart/form-data" },
      //   //{ Authorization: "Superd" + userInfo.token },
      // });
      dispatch({ type: PRODUCT_SAVE_EDIT_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

const editProduct = (product, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.post("/admin/product/edit/" + id, product, {
      headers: { "Content-Type": "multipart/form-data" },
      //{ Authorization: "Superd" + userInfo.token },
    });
    dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const data = await productApi.delete(id);
    //const { data } = await axios.delete("/admin/product/delete/" + id);
    // , {
    //   headers: { Authorization: "Superd" + userInfo.token },
    // });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

export { listProduct, detailProduct, saveProduct, deleteProduct, editProduct };
