import axiosClient from "./axiosClient";
import Cookie from "js-cookie";

const token = Cookie.get("userInfo")
  ? JSON.parse(Cookie.get("userInfo")).token
  : null;

const categoryApi = {
  getAll: () => {
    const url = "/admin/category";
    return axiosClient.get(url);
  },

  add: (category) => {
    const url = "/admin/category/add";
    return axiosClient.post(url, category, {
      headers: {
        Authorization: "Superd" + token,
      },
    });
  },

  edit: (category, id) => {
    const url = `/admin/category/edit/${id}`;
    return axiosClient.post(url, category, {
      headers: {
        Authorization: "Superd" + token,
      },
    });
  },

  delete: (id) => {
    const url = `/admin/category/delete/${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: "Superd" + token,
      },
    });
  },
};

export default categoryApi;
