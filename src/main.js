import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";

import Vuelidate from "vuelidate";
import VueSweetalert2 from "vue-sweetalert2";

import router from "./router";
import store from "@/state/store";
import i18n from "./i18n";

import "./utils/directives.js";
import Tooltip from "./utils/TooltipDirective";
import dateClass from "./helpers/date";
Vue.use(Tooltip);

const date = new dateClass(i18n.locale);

Vue.prototype.$date = date;

import "@/assets/scss/app.scss";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(Vuelidate);
Vue.use(VueSweetalert2);

Vue.use(require("vue-chartist"));
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
