import "./style.css";

import { createApp } from "vue";
import App from "./view/App.vue";

import { vuetify } from "./plugins/vuetify";
import { router } from "./router";
import { pinia } from "./store/index";

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(pinia);

app.mount("#app");
