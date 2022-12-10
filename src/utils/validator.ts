import { defineRule ,configure } from 'vee-validate';
import allRules from '@vee-validate/rules';
import { localize } from "@vee-validate/i18n";
import en from '@vee-validate/i18n/dist/locale/en.json';
Object.keys(allRules).forEach(rule => {
  defineRule(rule, allRules[rule]);
});

configure({
  generateMessage: localize("en", {
    messages: {
      required: "{field} is required.",
      min: "{field} must be at least of 0:{min} character.",
      length: "{field} must be of 0:{length} digits.",
      digits:"{field} must be of 0:{digits} digits.",
      numeric:"{field} must be numeric.",
      email:"{field} must be valid email" 
    },
  }),
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

localize("en", en);