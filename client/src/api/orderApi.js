import axiosClient from "./axiosClient";
import Cookie from "js-cookie";
const token = Cookie.get("userInfo")
  ? JSON.parse(Cookie.get("userInfo")).token
  : null;

const orderApi = {
  addOrder: (order) => {
    const url = "/order/add";
    return axiosClient.post(url, order, {
      headers: {
        Authorization: "Superd" + token,
      },
    });
  },

  listOrder: (params) => {
    const url = "/order";
    return axiosClient.get(url, {
      params,
      headers: {
        Authorization: "Superd" + token,
      },
    });
  },

  changeStateOrder: (idOrder, nextState) => {
    const url = `/order/changeState/${idOrder}`;
    return axiosClient.post(
      url,
      { nextState },
      {
        headers: {
          Authorization: "Superd" + token,
        },
      }
    );
  },
};

export default orderApi;
