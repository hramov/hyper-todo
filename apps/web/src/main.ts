import { createApp } from "vue";
import App from "./App.vue";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import { VCalendar, VDateInput, VTimePicker } from "vuetify/labs/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
import { ru } from "vuetify/locale";
import { createPinia } from "pinia";
import "./style.css";

const vuetify = createVuetify({
  theme: {
    defaultTheme: "dark",
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  components: {
    ...components,
    VDateInput,
    VCalendar,
    VTimePicker,
  },
  directives,
  locale: {
    locale: "ru",
    messages: { ru },
  },
});

const pinia = createPinia();

createApp(App).use(vuetify).use(pinia).mount("#app");
