import Vue from "vue";
import VueRouter from "vue-router";

import { trailingSlash } from "@/helpers/utilities";
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
const ColorPicker = () =>
  import(/* webpackChunkName: "color-picker" */ "@/components/ColorPicker");

const MePage = () => import(/* webpackChunkName: "me-page" */ "@/views/MePage");
const NotFoundPage = () =>
  import(/* webpackChunkName: "not-found-page" */ "@/views/NotFoundPage.vue");

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: { name: "main" } },
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
      {
        path: "color",
        name: "color",
        component: ColorPicker,
      },
    ],
  },
  {
    path: "/me",
    name: "me",
    component: MePage,
  },
  {
    path: "*",
    name: "404",
    component: NotFoundPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(({ path, hash }, from, next) => {
  return path.endsWith("/") ? next() : next(trailingSlash(path) + hash);
});

export default router;
