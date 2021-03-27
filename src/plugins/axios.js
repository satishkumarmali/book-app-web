import axios from "axios";
import router from "@/router";
import bus from "@/bus";

// DEFAULT CONFIG
const config = {
  baseURL: process.env.VUE_APP_API,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json"
  }
};

// INSTANCE
const $axios = axios.create(config);

// SET TOKEN
// Allows to set the token of axios instance after login
const setToken = token => {
  window.localStorage.setItem(`v2_${process.env.VUE_APP_SERVER}_token`, token);
  $axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

// TOKEN
// Add token to header if found in localStorage
if (window.localStorage.getItem(`v2_${process.env.VUE_APP_SERVER}_token`)) {
  setToken(window.localStorage.getItem(`v2_${process.env.VUE_APP_SERVER}_token`));
}

// INTERCEPTORS
$axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Logout if user is no longer authenticated
    // or the token is expired!
    if (error.response && error.response.status === 401) {
      router.replace("/logout");
    }
    //If status is not provided, axios is not sure what happend!
    if (!error.response && !error.status) {
      bus.$emit("network-error");
      return Promise.reject(error);
    } else {
      return Promise.reject(error.response);
    }
  }
);

export default $axios;
export {
  setToken
};