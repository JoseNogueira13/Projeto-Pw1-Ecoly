import { createRouter, createWebHistory } from "vue-router";
import AccountView from "../views/AccountView.vue";
import ActivitiesView from "../views/ActivitiesView.vue";
import AuthenticateView from "../views/AuthenticateView.vue";
import DashboardView from "../views/DashboardView.vue";
import HomeView from "../views/HomeView.vue";
import ManageView from "../views/ManageView.vue";
import NewsView from "../views/NewsView.vue";

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
      path: "/activities",
      name: "Activities",
      component: ActivitiesView,
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
  ],
});

export default router;
