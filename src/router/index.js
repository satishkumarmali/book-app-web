import Vue from "vue";
import Router from "vue-router";
// import store from "@/store/";
Vue.use(Router);

import book from "./book";
import publicRoutes from "./public";

const router = new Router({
  routes: [
    ...publicRoutes,
    {
      path: "/",
      component: require("@/views/Layout").default,
      children: [
        ...book,
        {
          path: "me",
          name: "me",
          component: require("@/views/profile/Me").default,
          meta: {
            icon: "AccountCircle",
            label: "My Profile",
            breadcrumbs: ["me"],
          },
        },
      ],
    },
  ],
});


export default router;
