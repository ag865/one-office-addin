import Axios from "axios";
// import {
//   storage
// } from "./storage";

function authRequestInterceptor(config) {
  // const token = storage.getToken();
  // if (token) {
  //   config.headers["Authorization"] = `${token}`;
  // }
  config.headers.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: "",
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // storage.clearToken();
    }

    const message = error.response?.data?.message || error.message;

    if (message) {
      // console.error(message);
    }

    return Promise.reject(error);
  }
);