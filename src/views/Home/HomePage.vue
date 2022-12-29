<template>
  <BasePage>
    <div class="container">
      <div class="flx w-100">
        <div class="w-70 bdr-right">
          <blog-list></blog-list>
        </div>
        <div class="w-30">
          <blog-aside />
        </div>
      </div>
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import BlogAside from '../Front/BlogAside.vue'
import BlogList from '../Front/BlogList.vue'
import BasePage from "@/components/layouts/BasePage.vue";
</script>


