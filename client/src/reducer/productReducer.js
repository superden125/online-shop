import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_SAVE_EDIT_SUCCESS,
} from "../constants/productConstants";

function productListReducer(state = { result: {} }, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, result: {} };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, result: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function productDetailReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { loading: true };
    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function productSaveReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_SAVE_REQUEST:
      return { loading: true };
    case PRODUCT_SAVE_SUCCESS:
      return { loadingSave: false, successSave: true, product: action.payload };
    case PRODUCT_SAVE_EDIT_SUCCESS:
      return { loadingSave: false, successEdit: true, product: action.payload };
    case PRODUCT_SAVE_FAIL:
      return { loadingSave: false, errorSave: action.payload };
    default:
      return state;
  }
}

function productDeleteReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        successDelete: true,
        product: action.payload,
      };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, errorDelete: action.payload };
    default:
      return state;
  }
}

export {
  productListReducer,
  productDetailReducer,
  productSaveReducer,
  productDeleteReducer,
};
