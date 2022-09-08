import Vue from "vue";
import VueRouter from "vue-router";

import IndexLayout from "@/views/IndexLayout.vue";
import HomeView from "@/views/HomeView.vue";

const MePage = () =>
  import(/* webpackChunkName: "me-page" */ "@/views/MePage.vue");
const UILayout = () =>
  import(/* webpackChunkName: "ui-layout" */ "@/views/UILayout.vue");
const HelloVuetify = () =>
  import(/* webpackChunkName: "hello-vuetify" */ "@/components/HelloVuetify");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: IndexLayout,
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
      },
      {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about-view" */ "@/views/AboutView.vue"),
      },
    ],
  },
  {
    path: "/ui",
    component: UILayout,
    children: [
      {
        path: "",
        name: "ui",
        component: HelloVuetify,
      },
    ],
  },
  {
    path: "/me",
    name: "me",
    component: MePage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
