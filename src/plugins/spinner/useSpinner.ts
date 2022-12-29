import LoadingSpinner from "./LoadingSpinner.vue";
import { createApp } from "vue";

const spinnerWrapper = document.createElement("div");
spinnerWrapper.setAttribute('id','v__loading_spinner_wrapper')

export default function useSpinner() {
  document.body.appendChild(spinnerWrapper);
  const loadSpinner = (v: boolean) => {
    const spinnerComponent = createApp(LoadingSpinner, { showSpin: v });
    spinnerComponent.mount(spinnerWrapper);
  };

  return {
    loadSpinner,
  };
}
