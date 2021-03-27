import axios from "@/plugins/axios";

export default () => {
  return Promise.all([axios.get("v1/me")]);
};
