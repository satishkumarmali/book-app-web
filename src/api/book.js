import axios from "@/plugins/axios.js";

export const lookUp = (data) => {};

export const get = (id) => {
  return axios.get(`/v1/book/${id}`).then((res) => res.data);
};

export const create = (data) => {
  return axios.post("/v1/book/", data);
};

export const update = (id, data) => {
  return axios.put(`/v1/book/${id}`, data);
};

export const deleteBook = (id) => {
  return axios.delete(`/v1/book/${id}`);
};