import axios from "@/plugins/axios.js";

export const login = data => {
  return axios.post("/v1/login/", data);
};

export const getUser = () => {
  return axios.get("/v1/me");
};


