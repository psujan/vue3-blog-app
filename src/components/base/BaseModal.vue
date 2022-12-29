<template>
  <div class="modal-dialog" :class="[show ? 'modal--active' : '']">
    <div class="modal-wrap">
      <div class="modal-content" :style="{ width: width + 'px' }" :class="[show ? 'modal--active' : '']">
        <div class="modal-header" v-if="showHeader">
          <h4 class="modal-title">
            <span v-if="title">{{ title }}</span>
          </h4>
          <span class="modal-close" @click="closeModal">
            <i class="las la-times"></i>
          </span>
        </div>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  show: boolean;
  showHeader?: boolean;
  dialogClass?: string;
  modalContainerClass?: string;
  width?: number;
}
withDefaults(defineProps<Props>(), {
  showHeader: true,
  width: 800,
  show:false
});

// Emits
const emit = defineEmits<{
  (e: "onClose"): void;
}>();

const closeModal = () => {
  emit("onClose");
};
</script>

<style src="@/assets/saas/components//modal.scss" lang="scss">
</style>
