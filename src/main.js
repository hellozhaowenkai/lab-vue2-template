import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

import "normalize.css";

Vue.config.productionTip = false;

// eslint-disable-next-line no-undef
Vue.prototype.$projectConfig = $PROJECT_CONFIG; // webpack.DefinePlugin

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
