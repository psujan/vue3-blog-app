import { createApp} from "vue";
import App from "./App.vue";
import "./assets/main.scss";

// Global Components Regiter
import { registerComponents } from "./utils/global-components";

/**
 * additional third party libraries and plugins
 */
import LoadingSpinner from "./plugins/spinner";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueApexCharts from "vue3-apexcharts";
import { createPinia } from 'pinia'


//Use Utils
import "./utils/validator.ts";

/** Router*/
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
registerComponents(app);
app.use(LoadingSpinner);
app.use(Toast);
app.use(VueApexCharts);
app.use(router);
app.use(pinia);
/**
 * mount app instance
 */
app.mount("#app");
