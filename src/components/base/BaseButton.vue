<template>
  <button
    @click="handleClick"
    :disabled="isDisabled"
    :class="buttonClassList"
  >
    <slot name="icon"></slot>
    {{ title }}
    <slot v-if="!title" />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const DEFAULT_BUTTON_CLASS = "page-btn";

const props = defineProps({
  title: {
    required: false,
    type: String,
    default: "",
  },
  isDisabled: {
    required: false,
    type: Boolean,
    default: false,
  },
  btnClass: {
    required: false,
    default: "",
  },
  type: {
    required: false,
    default: "button",
  },
});

// Emits
const emit = defineEmits<{
  (e: "onClick", event: Event): void;
}>();

//computed properties
const buttonClassList = computed(() => {
  if (props.btnClass) {
    if (typeof props.btnClass == "object") {
      return [...props.btnClass, props.isDisabled ? "page-btn-disabled" : ""];
    }
    return props.btnClass;
  }

  return `${DEFAULT_BUTTON_CLASS} ${
    props.isDisabled ? "page-btn-disabled" : ""
  }`;
});

//methods
const handleClick = (event: Event): void => {
  emit("onClick", event);
};
</script>

<style scoped lang="scss">
@import "@/assets/saas/components/buttons.scss";
</style>
