<template>
  <header class="header">
    <div class="container flx flx-x-btwn flx-y-ctr pt-10 pb-10">
      <BaseLogo />
      <div class="search">
        <form @submit.prevent="handleSearch">
          <input-text
            field-class="search-input"
            input-class="form-input"
            placeholder="Search ..."
            name="search"
            v-model="search"
          />
        </form>
      </div>
      <div>
        <a href="https://github.com/psujan/vue3-blog-app" target="_blank">
          <span class="f-large-80"><i class="lab la-github"></i></span>
        </a>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import BaseLogo from "../base/BaseLogo.vue";
import { ref } from "vue";
import { useBlogStore } from "@/store/blog";
import { useRouter } from "vue-router";
/**
 * composables
 */
const blogStore = useBlogStore();
const router = useRouter();
/**
 *
 * reactive data
 */
const search = ref("");
//methods
const handleSearch = () => {
  if (search.value) {
    router.push(`/?search=${search.value}`);
  } else {
    router.push(`/`);
  }
  // blogStore.setSearchQuery(search.value);
};
</script>

<style lang="scss" src="@/assets/saas/views/header.scss"></style>
