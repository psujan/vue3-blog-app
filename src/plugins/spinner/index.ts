import LoadingSpinner from "./LoadingSpinner.vue";
import  useSpinner  from "./useSpinner";
import type { App } from "vue";

export default {
  install: (app: App, options: any) => {
    app.component("loading-spinner", LoadingSpinner);
  },
};

export { useSpinner };
