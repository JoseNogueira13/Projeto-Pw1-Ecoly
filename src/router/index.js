import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import HomeView from "../views/HomeView.vue";
import AccountView from "../views/account/AccountView.vue";
import AuthenticateView from "../views/account/AuthenticateView.vue";
import ActivitiesView from "../views/activities/ActivitiesView.vue";
import ManageView from "../views/manage/ManageView.vue";
import NewsView from "../views/news/NewsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/news",
      name: "News",
      component: NewsView,
    },
    {
      path: "/news/:id",
      name: "NewsDetails",
      component: () => import("../views/news/NewsDetailView.vue"),
    },
    {
      path: "/news/create",
      name: "NewsCreate",
      component: () => import("../views/news/NewsCreateView.vue"),
    },
    {
      path: "/activities",
      name: "Activities",
      component: ActivitiesView,
    },
    {
      path: "/activities/create",
      name: "ActivitiesCreate",
      component: () => import("../views/activities/ActivitiesCreateView.vue"),
    },
    {
      path: "/activities/:id",
      name: "ActivitiesDetails",
      component: () => import("../views/activities/ActivitiesDetailView.vue"),
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashboardView,
    },
    {
      path: "/manage",
      name: "Manage",
      component: ManageView,
    },
    {
      path: "/account",
      name: "Account",
      component: AccountView,
    },
    {
      path: "/authenticate",
      name: "Authenticate",
      component: AuthenticateView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;
