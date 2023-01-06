/* Register global components*/
// import { App } from "vue";

// import components
import BaseButton from "@/components/base/BaseButton.vue";
import BaseRow from "@/components/base/BaseRow.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
// import { Form, Field } from 'vee-validate';
// register components
export const registerComponents = (app :any): void => {
  app.component("base-button", BaseButton);
  app.component("dashboard-layout", DashboardLayout);
  app.component("base-row", BaseRow);
  app.component("base-modal", BaseModal);
  // app.component('Form' , Form);
  // app.component('Field' ,Field);
};
