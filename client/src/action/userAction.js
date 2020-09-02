import axios from "axios";
import Cookie from "js-cookie";

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  LOGOUT,
} from "../constants/userConstants";
import userApi from "../api/userApi";

const login = (username, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { username, password } });
  try {
    const data = await userApi.login(username, password);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error });
  }
};

const register = (values) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: values });

  try {
    const data = await userApi.signup(values);
    if (data.error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: data });
    } else {
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      Cookie.set("userInfo", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};

const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  Cookie.remove("userInfo");
};

export { login, register, logout };
