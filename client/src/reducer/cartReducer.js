import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
  CART_REMOVE_ALL_ITEM,
} from "../constants/cartConstants";

function cartReducer(
  state = { cartItems: [], shipping: {}, paymentMethod: {} },
  action
) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      } else {
        return { cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case CART_REMOVE_ALL_ITEM:
      return {
        cartItems: [],
      };

    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload };
    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };

    // case CART_ORDER_REQUEST:
    //   return { ...state, loadingOrder: true };
    // case CART_ORDER_SUCCESS:
    //   return {
    //     ...state,
    //     loadingOrder: false,
    //     successOrder: true,
    //     order: action.payload,
    //   };
    // case CART_ORDER_FAIL:
    //   return { ...state, loadingOrder: false, errorOrder: action.payload };
    default:
      return state;
  }
}

export { cartReducer };
