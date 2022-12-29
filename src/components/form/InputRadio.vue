<template>
  <div :class="fieldClass">
    <label :for="computedId" :class="labelClass"
      >{{ label }} <span class="form-required" v-if="isRequired">*</span></label
    >
    <Field
      :name="name"
      v-slot="{ field, meta }"
      :rules="rules"
      v-model="computedValue"
      :validateOnInput="true"
    >
      <div class="flx">
        <template v-if="options.length">
          <span class="form-check-wrap" v-for="(option, i) in options" :key="i">
            <input
              v-bind="field"
              type="radio"
              :value="option.value"
              v-model="computedValue"
              :name="name"
              :class="[
                inputClass,
                meta.touched && !meta.valid ? 'is-invalid' : '',
              ]"
            />
            <label for="">{{ option.name }}</label>
          </span>
        </template>
      </div>
    </Field>
    <ErrorMessage :name="name" class="form-error-text" />
    <!--Slot For Custom Error Messages-->
    <slot name="error-message"></slot>
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from "vee-validate";
import { computed } from "vue";
interface RadioOptions {
  name: string | number;
  value: string | number;
}
interface Props {
  label?: string;
  inputId?: string;
  fieldClass?: string;
  labelClass?: string;
  inputClass?: string;
  rules?: any;
  name: string;
  modelValue: any;
  options: RadioOptions[];
}

// Props
const props = withDefaults(defineProps<Props>(), {
  labelClass: "form-label",
  fieldClass: "w-6 mb-18",
  inputClass: "form-check",
  rules: {
    required: false,
  },
});

//Emits
const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
}>();

//Computed Properties

const computedValue = computed({
  // getter
  get() {
    return props.modelValue;
  },
  // setter
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});

const computedId = computed(() => {
  if (props.inputId) {
    return props.inputId;
  }
  if (props.label) {
    return `label-${props.label}`;
  }
  return `label-${Math.random().toString(36).substring(2, 7)}`;
});

const isRequired = computed(() => {
  if (props.rules) {
    if (typeof props.rules == "object") {
      return props.rules.required;
    }

    if (typeof props.rules == "string") {
      return props.rules == "required";
    }
    return false;
  }
  return false;
});
</script>

<style>
.is-invalid {
  border: 1px solid rgb(255, 0, 0) !important;
}
</style>
