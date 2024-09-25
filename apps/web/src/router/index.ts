import { createRouter, createWebHashHistory } from "vue-router";
import Task from "../view/pages/task/Task.vue";

const routes = [
  { path: "/", component: Task },
  {
    path: "/category",
    component: () => import("../view/pages/category/Category.vue"),
  },
  {
    path: "/account",
    component: () => import("../view/pages/account/Account.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
