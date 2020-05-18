import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.ts";
import router from "./router";
import axios from "axios";
import "./plugins/avue";

Vue.config.productionTip = false;
const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

Vue.prototype.$httpajax = http;
Vue.prototype.$http = http;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
