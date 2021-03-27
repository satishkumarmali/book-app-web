export default [
  {
    path: "/books",
    name: "books",
    component: require("@/views/book/List").default,
    meta: {
      icon: "AccountCircle",
      label: "Books",
      breadcrumbs: ["books"],
    },
  },
  {
    path: "/book/:id",
    name: "book",
    component: require("@/views/book/Item").default,
    props: true,
    meta: {
      admin: true,
      label: "Book",
      breadcrumbs: ["books", "book-edit"],
    },
  },
  {
    path: "/book/:id/view",
    name: "book-view",
    component: require("@/views/book/View").default,
    props: true,
    meta: {
      admin: true,
      label: "Book",
      breadcrumbs: ["books", "book-view"],
    },
  },
];
