<template>
  <div :class="fieldClass">
    <label :for="computedId" :class="labelClass"
      >{{ label }} <span class="form-required" v-if="isRequired">*</span></label
    >
    <Field :name="name" v-slot="{ field, errors, meta }" :rules="rules">
      <select
        v-bind="field"
        :class="[inputClass, meta.touched && !meta.valid ? 'is-invalid' : '']"
        :placeholder="computedPlaceholder"
        :id="computedId"
        v-model="computedValue"
      >
        <option value="">Please Chose Option</option>
        <template v-if="options.length">
          <option :value="option.value" v-for="(option, i) in options" :key="i">
            {{ option.name }}
          </option>
        </template>
      </select>
    </Field>
    <ErrorMessage :name="name" class="form-error-text" />
    <!--Slot For Custom Error Messages-->
    <slot name="error-message"></slot>
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from "vee-validate";
import { computed } from "vue";
interface SelectOptions {
  name: string | number;
  value: string | number;
  disabled?: boolean;
}
interface Props {
  label?: string;
  inputId?: string;
  placeholder?: string;
  fieldClass?: string;
  labelClass?: string;
  inputClass?: string;
  rules?: any;
  name: string;
  vmodel: any;
  options: SelectOptions[];
}

interface FieldMeta {
  dirty: boolean;
  pending: boolean;
  touched: boolean;
  valid: boolean;
  initialValue: any;
}

// Props
const props = withDefaults(defineProps<Props>(), {
  labelClass: "form-label",
  fieldClass: "w-6 mb-18",
  inputClass: "form-input",
  rules: {
    required: false,
  },
});

//Emits
const emit = defineEmits<{
  (e: "update:vmodel", value: any): void;
}>();

//Computed Properties

const computedValue = computed({
  // getter
  get() {
    return props.vmodel;
  },
  // setter
  set(newValue) {
    console.log(newValue);
    emit("update:vmodel", newValue);
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

const getComputedInputClass = (meta: FieldMeta) => {
  const { touched, valid } = { ...meta };
  if (touched && !valid) {
    return "form-input is-invalid";
  }
  return "form-input";
};
</script>

<style>
.is-invalid {
  border: 1px solid rgb(255, 0, 0) !important;
}
</style>
