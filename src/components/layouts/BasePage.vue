<template>
<div>
  <base-header/>
  <slot></slot>
  <base-footer />
</div>
</template>

<script setup lang="ts">
import BaseFooter from './BaseFooter.vue'
import BaseHeader from "./BaseHeader.vue";
</script>