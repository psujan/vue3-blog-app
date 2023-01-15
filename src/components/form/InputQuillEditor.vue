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
    >
      <QuillEditor
        :content="computedValue"
        content-type="html"
        theme="snow"
        :toolbar="computedToolbar"
        :placeholder="computedPlaceholder"
        @update:content="handleChange"
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

const computedToolbar = computed(() => [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["image"],
  ["clean"], // remove formatting button
]);

const handleChange = (text: string) => {
  if (text == "<p><br></p>") {
    emit("update:modelValue", "");
    return;
  }
  emit("update:modelValue", text);
};
</script>

<style>
.is-invalid {
  border: 1px solid rgb(255, 0, 0) !important;
}
.ql-editor {
  min-height: 400px;
  font-family: "Poppins", sans-serif;
}
</style>

<style scoped></style>
