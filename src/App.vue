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
@import "./assets/saas/utils.scss";
</style>
