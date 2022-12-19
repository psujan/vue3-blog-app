<template>
  <div>
    <div class="modal-dialog" :class="[show ? 'show' : '']">
      <div class="modal-container">
        <div class="modal-wrap">
          <div class="modal-content" :class="[show ? 'is-active' : '']">
            <div class="modal-header">
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
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  show: {
    type: Boolean;
    required: false;
    default: false;
  };
}>();

// Emits
const emit = defineEmits<{
  (e: "onClose"): void;
}>();

const closeModal = () => {
  emit("onClose");
};
</script>

<style src="@/assets/saas/components//modal.scss" lang="scss"></style>
