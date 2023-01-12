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
    </div>
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
