import axiosClient from "./axiosClient";
import Cookie from "js-cookie";
const token = Cookie.get("userInfo")
  ? JSON.parse(Cookie.get("userInfo")).token
  : null;

const productApi = {
  getAll: (params) => {
    const url = "/product";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },

  add: (product) => {
    const url = "/admin/product/add";
    return axiosClient.post(url, product, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Superd" + token,
      },
    });
  },

  edit: (product, id) => {
    const url = `/admin/product/edit/${id}`;
    return axiosClient.post(url, product, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Superd" + token,
      },
    });
  },

  delete: (id) => {
    const url = `/admin/product/delete/${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: "Superd" + token,
      },
    });
  },
};

export default productApi;
