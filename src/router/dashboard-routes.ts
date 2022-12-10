const dashboardRoutes = [
  {
    path: "/dashboard",
    redirect: "/dashboard/home",
    children: [
      {
        path: "blogs",
        name: "dashboard.blogs",
        component: () => import("@/views/Admin/Blogs/Blog.vue"),
      },
      {
        path: "categories",
        name: "dashboard.categories",
        component: () => import("@/views/Admin/Categories/Category.vue"),
      },
    ],
  },
  {
    path: "/dashboard/home",
    component: () => import("@/views/Admin/Dashboard/Dashboard.vue"),
    meta: { sidebar: false },
  },
];

export default dashboardRoutes;
