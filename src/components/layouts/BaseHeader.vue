<template>
  <header class="header">
    <div class="container flx flx-x-btwn flx-y-ctr pt-10 pb-10">
      <BaseLogo />
      <div class="search" id="h-search">
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
      <div id="h-github-link">
        <a href="https://github.com/psujan/vue3-blog-app" target="_blank">
          <span class="f-large-80"><i class="lab la-github"></i></span>
        </a>
      </div>
      <span class="icon-lg h-icon-bars" @click="showMobileMenu">
        <i class="la la-bars"></i>
      </span>
    </div>
    <div class="h-mobile-menu" :class="showMobileNav ? 'active' : ''">
      <div class="pl-8 pr-8">
        <div class="d-flex pt-15 pb-15 flx-y-ctr bdr-bottom">
          <div class="w-10">
            <span class="icon-lg" @click="showMobileNav = false">
              <i class="la la-arrow-left"></i>
            </span>
          </div>
          <div class="w-90">
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
        </div>
        <div class="mt-15 mb-15">
          <h2 class="f-h2">Reading Topics</h2>
        </div>
        <ul class="h-reading-category" v-if="computedReadingList.length">
          <li class="mb-10" v-for="(row, i) in computedReadingList" :key="i">
            <a
              href="javascript:;"
              @click="handleCategoryClick(row.name as string)"
              class="page-btn-tag"
              >{{ row.name }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import BaseLogo from "../base/BaseLogo.vue";
import { ref, computed } from "vue";
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
const showMobileNav = ref(false);
/**
 * computed properties
 */
/**
 * computed properties
 */
const computedReadingList = computed(() => {
  return blogStore.statusByCategory;
});
/**
 * functions
 */
const handleSearch = () => {
  if (search.value) {
    router.push({
      name: "Home",
      query: { search: modifiedCategoryName(search.value) },
    });
    showMobileNav.value = false;
  }
  // blogStore.setSearchQuery(search.value);
};

const showMobileMenu = () => {
  showMobileNav.value = true;
};
const modifiedCategoryName = (name: string) => {
  return name.trim().replace("&", "and");
};

const handleCategoryClick = (name: string) => {
  showMobileNav.value = false;
  router.push({
    name: "Home",
    query: { category: modifiedCategoryName(name) },
  });
};
</script>

<style lang="scss" src="@/assets/saas/views/header.scss"></style>
