import axiosClient from "./axiosClient";
import Cookie from "js-cookie";
const token = Cookie.get("userInfo")
  ? JSON.parse(Cookie.get("userInfo")).token
  : null;

const userApi = {
  login: (username, password) => {
    const url = "/user/login";
    return axiosClient.post(url, { username, password });
  },

  signup: (data) => {
    const url = "user/signup";
    return axiosClient.post(url, data);
  },

  getUser: (id) => {
    const url = `user/getUser/${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: "Superd" + token,
      },
    });
  },
};

export default userApi;
