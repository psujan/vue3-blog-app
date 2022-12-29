<template>
  <div class="common-layout">
    <template>
      <loading-spinner />
    </template>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import BaseHeader from "@/components/layouts/BaseHeader.vue";
</script>

<style lang="scss">
/**Import all globally used styles */
@import "./assets/saas/utils.scss";
@import "./assets/saas/components/form.scss";
</style>
