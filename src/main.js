import { createPinia } from "pinia";
// Change the createApp line to this
import Vue, { createApp } from "@vue/compat";
import withUUID from "vue-uuid";
import App from "./App.vue";
import router from "./router";

// Import BootstrapVue and its default styles
import BootstrapVue from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);

import "./assets/fonts.css";
import "./assets/main.css";

const pinia = createPinia();
const app = withUUID(createApp(App));

app.use(pinia);
app.use(router);

app.mount("#app");
