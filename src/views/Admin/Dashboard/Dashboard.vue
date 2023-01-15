<template>
  <dashboard-layout>
    <div class="container">
      <base-row class="mb-18">
        <div class="col-12">
          <h1 class="f-h2">Overview</h1>
        </div>
      </base-row>
      <base-row class="mb-30 flx-x-btwn">
        <dashboard-charts
          :status-series="blogStatusSeries"
          :categories="categories"
          :active-array="activeCounts"
          :inactive-array="inactiveCounts"
        />
      </base-row>
      <base-row class="mb-30">
        <div class="col-12">
          <h1 class="f-h2 mb-18">Recent Blogs</h1>
        </div>
        <div class="col-12">
          <div class="p-12 b-white round-10">
            <recent-blogs :rows="computedRecentBlogs" />
          </div>
        </div>
      </base-row>
    </div>
  </dashboard-layout>
</template>

<script setup lang="ts">
import RecentBlogs from "./partials/RecentBlogs.vue";
import { computed, onMounted } from "vue";
import DashboardCharts from "./partials/DashboardCharts.vue";
import { useBlogStore } from "@/store/blog";
import { recentBlogCount } from "@/common/constant";
interface CategoryType {
  name: string;
  [key: string]: any;
}
const blogStore = useBlogStore();

const blogStatusSeries = computed<[number, number]>(() => {
  return [blogStore.getActiveBlogs.length, blogStore.getInactiveBlogs.length];
});

const categories = computed(() => {
  return blogStore.getCountByCategory.map((item: CategoryType) => item.name);
});

const activeCounts = computed(() => {
  return blogStore.getCountByCategory.map((item: CategoryType) => item.active);
});

const inactiveCounts = computed(() => {
  return blogStore.getCountByCategory.map(
    (item: CategoryType) => item.inactive
  );
});

const computedRecentBlogs = computed(() => {
  return blogStore.blogs.slice(0, recentBlogCount);
});

onMounted(() => {
  console.log("Dashboard Home Mounted Successfully");
});
</script>
