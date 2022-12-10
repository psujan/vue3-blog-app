import { createApp, useAttrs } from "vue";
import App from "./App.vue";
import "./assets/main.scss";

// Global Components Regiter
import { registerComponents } from "./utils/global-components"

//Use Utils
import './utils/validator.ts';
/** Router*/

import router from './router'

const app = createApp(App);
registerComponents(app);
app.use(router);
app.mount("#app");
