import Vue from "vue";
import VueRouter from "vue-router";
import IndexLayout from "@/views/IndexLayout.vue";
import HomeView from "@/views/HomeView.vue";

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
          import(/* webpackChunkName: "about" */ "@/views/AboutView.vue"),
      },
    ],
  },
  {
    path: "/me",
    name: "me",
    component: () => import(/* webpackChunkName: "me" */ "@/views/MePage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
