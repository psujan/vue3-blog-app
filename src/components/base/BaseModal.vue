<template>
  <Transition name="modal-fade">
    <div class="modal-dialog" v-show="show">
      <div class="modal-wrap">
        <Transition :name="`modal-${animationName}`">
          <div
            class="modal-content"
            v-show="show"
            :style="{ width: width + 'px' }"
          >
            <span class="modal-close" @click="closeModal" v-if="showCloseIcon">
              <i class="las la-times"></i>
            </span>
            <div class="modal-header" v-if="showHeader">
              <h4 class="modal-title">
                <span v-if="title">{{ title }}</span>
              </h4>
            </div>
            <div class="modal-body">
              <slot />
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  show: boolean;
  showHeader?: boolean;
  showCloseIcon?: boolean;
  dialogClass?: string;
  modalContainerClass?: string;
  width?: number;
  animationName?: string;
}
withDefaults(defineProps<Props>(), {
  showHeader: true,
  showCloseIcon: true,
  width: 800,
  show: false,
  animationName: "slideIn",
});

// Emits
const emit = defineEmits<{
  (e: "onClose"): void;
}>();

const closeModal = () => {
  emit("onClose");
};
</script>

<style lang="scss" scoped>
.modal-dialog {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  outline: none;
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.3);
}

.modal-header {
  margin-bottom: 1.6rem;
}

.modal-title {
  font-size: 20px;
  font-weight: 700;
  padding: 0 15px;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 15px;
  cursor: pointer;
  height: 2rem;
  width: 2rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  transition: background-color 0.3s ease;
  border-radius: 50%;
  justify-self: flex-end;
  &:hover{
    background-color: #f1f4f3;
  }
}

.modal-container {
  max-width: 800px;
  height: 100%;
  margin: 0 auto;
}

.modal-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
}

.modal-content {
  position: relative;
  width: 800px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  z-index: inherit;
  max-height: 90%;
  overflow-y: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 12px 0px;
}

@media (max-width: 768px) {
  .modal-content {
    max-width: 600px;
  }
}

@media (max-width: 500px) {
  .modal-content {
    max-width: 450px;
  }
}

/**Modal Transitions */
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

/**Zoom */
.modal-zoom-enter-active {
  animation: zoom 0.3s ease-in-out;
}
.modal-zoom-leave-active {
  animation: zoom 0.3s ease-in-out reverse;
}

@keyframes zoom {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

/**Slide In */
.modal-slideIn-enter-from{
  transform: translateY(-100px);
}

.modal-slideIn-enter-to{
  transform: translateY(0);
}

.modal-slideIn-enter-active{
  transition: transform 0.3s ease-in-out;
}

.modal-slideIn-leave-from{
  transform: translateY(0);
}

.modal-slideIn-leave-to{
  transform: translateY(-100px);
}

.modal-slideIn-leave-active{
  transition: transform 0.3s ease-in-out;
}
</style>

<!-- <style src="@/assets/saas/components/modal.scss" lang="scss"></style> -->
