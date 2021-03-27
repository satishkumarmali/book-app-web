export default [
  {
    path: "/login",
    name: "login",
    component: require("@/views/auth/Login").default,
  },
  {
    path: "/logout",
    name: "logout",
    component: require("@/views/auth/Logout").default,
  },
];
