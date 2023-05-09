import { createRouter, createWebHistory } from "vue-router";
import StartPage from "../components/StartPage.vue";
import Roll from "../views/Roll.vue";
import RPC from "../views/RPC.vue";
import RPC2 from "../views/RPC2.vue";
import MouseFollow from "../views/MouseFollow.vue";
import ErrorPage from "../views/ErrorPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: StartPage,
    },
    {
      path: "/roll",
      name: "Roll",
      component: Roll,
    },
    {
      path: "/rpc",
      name: "RPC",
      component: RPC,
    },
    {
      path: "/rpc2",
      name: "RPC2",
      component: RPC2,
    },
    {
      path: "/MouseFollow",
      name: "MouseFollow",
      component: MouseFollow,
    },
    {
      path: "/home",
      redirect: "/",
    },
    {
      path: "/404",
      name: "ErrorPage",
      component: ErrorPage,
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/404",
    },
  ],
});

export default router;
