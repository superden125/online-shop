import axios from "axios";
import queryString from "query-string";
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs

const axiosOutsideApi = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://thongtindoanhnghiep.co",
  headers: {
    "Access-Control-Allow-Headers": "*",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosOutsideApi.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
axiosOutsideApi.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosOutsideApi;
