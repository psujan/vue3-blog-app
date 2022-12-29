<template>
  <div :class="fieldClass">
    <label :for="computedId" :class="labelClass" v-if="label"
      >{{ label }} <span class="form-required" v-if="isRequired">*</span></label
    >
    <Field
      :name="name"
      :rules="rules"
      v-model="computedValue"
      :type="type"
      v-slot="{ field, meta }"
    >
      <input
        v-bind="field"
        :class="[inputClass, meta.touched && !meta.valid ? 'is-invalid' : '']"
        :id="computedId"
        :placeholder="computedPlaceholder"
      />
    </Field>

    <ErrorMessage :name="name" class="form-error-text" />
    <!--Slot For Custom Error Messages-->
    <slot name="error-message"></slot>
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from "vee-validate";
import { computed } from "vue";
interface Props {
  label?: string;
  inputId?: string;
  placeholder?: string;
  type?: string;
  fieldClass?: string;
  labelClass?: string;
  inputClass?: string;
  rules?: any;
  name: string;
  modelValue: any;
}

// Props
const props = withDefaults(defineProps<Props>(), {
  labelClass: "form-label",
  fieldClass: "w-6 mb-18",
  inputClass: "form-input",
  type: "text",
  rules: {
    required: false,
  },
});

// Emits
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
    console.log(newValue);
    return emit("update:modelValue", newValue);
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

const computedPlaceholder = computed(() => {
  if (props.placeholder) {
    return props.placeholder;
  }
  if (props.label) {
    return `Enter ${props.label}`;
  }
  return "Enter Value";
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

// const getInputClass = (meta) => {
//   return meta.touched && !meta.valid ? "is-invalid" : "";
// };
</script>

<style>
.is-invalid {
  border: 1px solid rgb(255, 0, 0) !important;
}
</style>
