import Vue from "vue";
import App from "./App.vue"; // 显式添加 .vue 后缀
import { auth } from "./common/auth.js";

Vue.config.productionTip = false;
Vue.prototype.$auth = auth;

App.mpType = "app";

const app = new Vue({ ...App });
app.$mount();
