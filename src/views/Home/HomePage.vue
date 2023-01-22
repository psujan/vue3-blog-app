<template>
  <BasePage>
    <div class="container">
      <div class="row">
        <div class="col-8 bdr-right blog-list-col">
          <blog-list :rows="computedBlogList[currentPage - 1]"></blog-list>
          <div v-if="computedBlogList.length">
            <pagination-links
              :current-page="currentPage"
              :total-pages="computedBlogList.length"
              @page-change="setCurrentPage"
            />
          </div>
        </div>
        <div class="col-4">
          <blog-aside />
        </div>
      </div>
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import PaginationLinks from "../../components/ui/PaginationLinks.vue";
import BlogAside from "../Front/BlogAside.vue";
import BlogList from "../Front/BlogList.vue";
import BasePage from "@/components/layouts/BasePage.vue";
import { ref, computed, watch, onMounted } from "vue";
import { useBlogStore } from "@/store/blog";
import usePagination from "@/composables/usePagination";
import { useRoute } from "vue-router";
import { homePageBlogLimit } from "@/common/constant";
/**
 * composables
 */
const blogStore = useBlogStore();
const { chunkItems } = usePagination();
const route = useRoute();
/**
 * reactive data
 */
const currentPage = ref<number>(1);
/**
 * computed properties
 */

const blogList = computed(() => {
  return blogStore.filteredBlogs;
});

const computedBlogList = computed(() => {
  const items = blogList.value;
  if (items?.length) {
    return chunkItems(items as [], homePageBlogLimit);
  }
  return [];
});
/**
 * functions
 */
const setCurrentPage = (pageNo: number) => {
  currentPage.value = pageNo;
};

/**
 *
 * @param search
 * @param category
 */
const filterBlogByCategory = (category: string) => {
  currentPage.value = 1;
  blogStore.filterActiveByCategory(category);
};

const searchBlog = (query: string) => {
  currentPage.value = 1;
  blogStore.filterActiveByQuery(query);
};

/**
 * watch
 */
watch(
  () => route.query,
  (q) => {
    /** Filtering both by category and search query is not available : Todo */
    const searchQuery = q.search;
    if (searchQuery) {
      searchBlog(searchQuery as string);
      return;
    } else {
      blogStore.setFilteredBlogs();
    }
    const category = q.category;
    if (category) {
      filterBlogByCategory(category as string);
    } else {
      blogStore.setFilteredBlogs();
    }
  },
  {
    immediate: true,
  }
);
/**
 * lifecycle
 */
</script>

<style scoped>
.blog-list-col {
  min-height: 90vh;
}
</style>
