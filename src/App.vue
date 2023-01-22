<template>
  <div class="common-layout">
    <template>
      <loading-spinner />
    </template>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useBlogStore } from "./store/blog";
import useSpinner from "@/composables/useSpinner";
/**
 * composable
 */
const { isLoading } = useSpinner();
const blogStore = useBlogStore();
/**
 * lifecycle hook
 */
onMounted(async () => {
  isLoading(true);
  await blogStore.getAllBlogs();
  await blogStore.getStatusByCategory();
  blogStore.setFilteredBlogs();
  isLoading(false);
});
</script>

<style lang="scss">
/**Import all globally used styles */
@import "./assets/saas/utils.scss";
@import "./assets/saas/components/form.scss";
</style>
