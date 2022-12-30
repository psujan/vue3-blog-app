<template>
  <base-modal
    v-model:show="show"
    :show-header="false"
    :show-close-icon="false"
    :width="400"
  >
    <div class="text-center mb-20">
      <h4><strong>Confrim</strong></h4>
      <p>Are you sure ?</p>
    </div>
    <div class="text-center action-buttons">
      <button class="page-btn mr-6" @click="handleClick(true)">Yes</button>
      <button class="page-btn" @click="handleClick(false)">Cancel</button>
    </div>
  </base-modal>
</template>

<script lang="ts" setup>
import BaseModal from "../base/BaseModal.vue";
interface Props {
  show: boolean;
}
// Props
const props = withDefaults(defineProps<Props>(), {
  show: false,
});

//emits
// Emits
const emit = defineEmits<{
  (e: "onConfirm", state:boolean): void;
  (e: "update:show", state: boolean): void;
}>();

//functions
const handleClick = (isYes: boolean) => {
  emit("onConfirm", isYes ? true : false);
  emit("update:show", false);
};
</script>

<style lang="scss" scoped>
h4 {
  font-size: 16px;
}
p {
  font-size: 15px;
  color: rgb(162, 158, 158);
  margin: 10px;
}
button {
  width: 100px;
}
</style>
