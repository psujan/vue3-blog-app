<template>
  <div class="flx">
    <Sidebar />
    <div class="dashboard-container">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "../Sidebar.vue";
</script>

<style scoped lang="scss">
@import "../../assets/saas/variables.scss";

.dashboard-container{
  width: 100%;
  padding:20px  !important;
}
</style>
