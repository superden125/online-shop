import axiosOutsideApi from "./axiosOutsideApi";

const addressApi = {
  getCity: () => {
    try {
      const url = "/api/city";
      return axiosOutsideApi.get(url);
    } catch (error) {
      console.log(error);
    }
  },
};

export default addressApi;
