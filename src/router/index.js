import Vue from "vue";
import VueRouter from "vue-router";

import IndexLayout from "@/views/IndexLayout";
import HomeView from "@/views/HomeView";

// route level code-splitting
// this generates a separate chunk (about-view.[hash].js) for this route which is lazy-loaded when the route is visited.
const AboutView = () =>
  import(/* webpackChunkName: "about-view" */ "@/views/AboutView");
const APPLayout = () =>
  import(/* webpackChunkName: "app-layout" */ "@/views/APPLayout");
const UILayout = () =>
  import(/* webpackChunkName: "ui-layout" */ "@/views/UILayout");
const HelloVuetify = () =>
  import(/* webpackChunkName: "hello-vuetify" */ "@/components/HelloVuetify");

const MePage = () => import(/* webpackChunkName: "me-page" */ "@/views/MePage");

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: { name: "home" } },
  {
    path: "/home",
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
        component: AboutView,
      },
    ],
  },
  {
    path: "/main",
    component: APPLayout,
    children: [
      {
        path: "",
        name: "main",
        component: HomeView,
      },
      {
        path: "about",
        name: "main-about",
        component: AboutView,
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
