import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import quizlet from "./plugins/quizlet";
import globals from "./plugins/globals";

Vue.config.productionTip = false;
Vue.use(quizlet);
Vue.use(globals);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
