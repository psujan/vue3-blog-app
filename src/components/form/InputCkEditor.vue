<template>
  <div :class="fieldClass">
    <label :for="computedId" :class="labelClass"
      >{{ label }} <span class="form-required" v-if="isRequired">*</span></label
    >
    <Field
      :name="name"
      v-slot="{ field, errors, meta }"
      :rules="rules"
      :value="computedValue"
    >
      <ckeditor
        v-bind="field"
        :editor="editor"
        v-model="computedValue"
        :config="editorConfig"
      ></ckeditor>
    </Field>
    <ErrorMessage :name="name" class="form-error-text" />
    <!--Slot For Custom Error Messages-->
    <slot name="error-message"></slot>
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from "vee-validate";
import { computed, ref, reactive } from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const editor = ClassicEditor;
const ckeditor = CKEditor.component;
interface Props {
  label?: string;
  inputId?: string;
  placeholder?: string;
  fieldClass?: string;
  labelClass?: string;
  inputClass?: string;
  rules?: any;
  name: string;
  modelValue: any;
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
  (e: "update:modelValue", value: any): void;
}>();

// data
let editorConfig = reactive({
  placeholder: props.placeholder
    ? props.placeholder
    : props.label
    ? `Enter ${props.label}`
    : "Enter Description",
});
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

<style scoped>
textarea {
  font-family: inherit;
}
</style>

<style>
.ck-editor__editable {
  min-height: 280px;
}
</style>
