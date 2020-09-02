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

function orderReducer(state = { order: {} }, action) {
  switch (action.type) {
    case ORDER_ADD_REQUEST:
      return { loadingOrder: true };
    case ORDER_ADD_SUCCESS:
      return {
        loadingOrder: false,
        successOrder: true,
        order: action.payload,
      };
    case ORDER_ADD_FAIL:
      return { loadingOrder: false, errorOrder: action.payload };

    case ORDER_LIST_REQUEST:
      return { loadingOrder: true, order: {} };
    case ORDER_LIST_SUCCESS:
      return { loadingOrder: false, order: action.payload };
    case ORDER_LIST_FAIL:
      return { loadingOrder: false, errorOrder: action.payload };

    case ORDER_CHANGE_STATE_REQUEST:
      return { ...state, loadingOrder: true };
    case ORDER_CHANGE_STATE_SUCCESS:
      return { ...state, loadingOrder: false, changeState: action.payload };
    case ORDER_CHANGE_STATE_FAIL:
      return { ...state, loadingOrder: false, errorOrder: action.payload };
    default:
      return state;
  }
}

export { orderReducer };
