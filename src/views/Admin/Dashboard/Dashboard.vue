<template>
  <dashboard-layout>
    <base-row class="mb-30">
      <h1 class="f-h2">Overview</h1>
    </base-row>
    <base-row class="mb-30">
      <dashboard-charts
        :status-series="blogStatusSeries"
        :categories="categories"
        :active-array="activeCounts"
        :inactive-array="inactiveCounts"
      />
    </base-row>
  </dashboard-layout>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import DashboardCharts from "./partials/DashboardCharts.vue";
import { useBlogStore } from "@/store/blog";
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

onMounted(() => {
  console.log("Dashboard Home Mounted Successfully");
});
</script>
