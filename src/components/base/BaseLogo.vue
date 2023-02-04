<template>
  <div>
    <router-link to="/">
      <div class="logo">
        <span class="logo-text" :style="{ color: color }">
          <div class="logo-circle"></div>
          <div class="logo-circle"></div>
          <span>Blog App</span>
        </span>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
interface Props {
  color?: string; //expected hex color code
}

// Props
const props = withDefaults(defineProps<Props>(), {
  color: "#100b0b",
});
</script>

<style lang="scss" scoped>
@import "../../assets/saas/variables.scss";

.logo-text {
  display: inline-flex;
  position: relative;
  color: $black-color;
  font-weight: 700;
}

.logo-circle {
  width: 18px;
  height: 18px;
  background: $primary-color;
  border-radius: 50%;
}

.logo-circle:nth-child(2) {
  transform: translateX(-6px) translateY(-12px);
  margin-right: 6px;
}
</style>
