import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import {
  productListReducer,
  productDetailReducer,
  productSaveReducer,
  productDeleteReducer,
} from "./reducer/productReducer";
import { cartReducer } from "./reducer/cartReducer";
import { userSignReducer, userRegisterReducer } from "./reducer/userReducer";
import {
  categoryListReducer,
  categorySaveReducer,
  categoryDeleteReducer,
} from "./reducer/categoryReducer";
import { orderReducer } from "./reducer/orderReducer";

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
const initState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userLogin: { userInfo },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userSignReducer,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  categoryList: categoryListReducer,
  categorySave: categorySaveReducer,
  categoryDelete: categoryDeleteReducer,
  order: orderReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
