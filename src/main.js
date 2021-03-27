import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';

require("./scss/index.scss");
require("./plugins/index.js");

Vue.config.productionTip = false;
Vue.component('PageHeader', require("@/components/PageHeader.vue").default);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');