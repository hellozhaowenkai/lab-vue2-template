import Vue from "vue";
import Toast from "vue-toastification";

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
  // You can set your default options here
  position: "bottom-left",
  timeout: 5000,
  hideProgressBar: true,
  maxToasts: 5,
  transition: "Vue-Toastification__fade",
};

Vue.use(Toast, options);
