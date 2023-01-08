<template>
  <dashboard-layout>
    <base-row class="mb-30">
      <h1 class="f-h2">Overview</h1>
    </base-row>
    <base-row class="mb-30">
      <dashboard-charts />
    </base-row>
  </dashboard-layout>
</template>

<script setup lang="ts">
import DashboardCharts from "./partials/DashboardCharts.vue";
</script>
