import { createRouter, createWebHistory } from "vue-router";

import dashboardRoutes from "./dashboard-routes";
/**
 * Application Routes
 */
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home/HomePage.vue"),
  },
  ...dashboardRoutes
];

const router = createRouter({ history: createWebHistory(), routes });
export default router;
