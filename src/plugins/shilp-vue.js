import Vue from "vue";
import axios from "@/plugins/axios.js";

//Shilp
import ShilpVue from "shilp-vue";
import { FieldValidate, FormValidate, ListPlugin, ListTable } from "shilp-vue";
Vue.use(ShilpVue, {
  vueMaterialDesignIcons: require("@/icons").default,
});
Vue.component("SFieldValidate", FieldValidate);
Vue.component("SFormValidate", FormValidate);
Vue.component("SpListTable", ListTable);
require("shilp-vue/dist/shilp-vue.css");

Vue.use(ListPlugin, {
  requestHandler({ method, endpoint, params, filters, pagination }) {
    return axios[method](endpoint, {
      params: {
        ...params,
        filter: filters,
        page: pagination.page,
        limit: pagination.perPage,
      },
    })
      .then((res) => res.data)
      .then((res) => {
        return {
          items: res.items,
          count: res.totalItems || res.meta.totalItems,
        };
      });
  },
});
