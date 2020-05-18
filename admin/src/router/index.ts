import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ResourceCrud from "../views/ResourceCrud.vue";
import Main from "../views/Main.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "/",
        component: Home,
      },
      {
        name: "Resource-Crud",
        path: "/:resource/list",
        component: ResourceCrud,
        props: true,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
