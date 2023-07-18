import Vue from "vue";
import Vuex from "vuex";
import like from "@/store/like";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { message: "hello, world" },
  getters: {},
  mutations: {},
  actions: {},

  modules: { like },
});
