<template>
  <div class="w-8 p-12">
    <h5>By Category</h5>
    <apexchart type="bar" :options="chartOptions" :series="series" />
  </div>
  <div class="w-4 p-12 b-white flx-y-self-start round-10">
    <h5>By Status</h5>
    <apexchart type="donut" :options="statusOptions" :series="statusSeries" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const chartOptions = reactive({
  chart: {
    type: "bar",
    height: 430,
  },
  colors: ["#09bdf0", "#ff4a4a"],
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        position: "top",
      },
    },
  },
  dataLabels: {
    enabled: true,
    offsetX: -6,
    style: {
      fontSize: "12px",
      colors: ["#fff"],
    },
  },
  stroke: {
    show: true,
    width: 1,
    colors: ["#fff"],
  },
  tooltip: {
    shared: true,
    intersect: false,
  },
  xaxis: {
    categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
});

const series = reactive([
  {
    name: "Active",
    data: [44, 55, 41, 64, 22, 43, 21],
  },
  {
    name: "Inactive",
    data: [53, 32, 33, 52, 13, 44, 32],
  },
]);

const statusSeries = reactive([18, 12]);
const statusOptions = reactive({
  chart: {
    type: "donut",
  },
  labels: ["Active", "Inactive"],
  colors: ["#09bdf0", "#ff4a4a"],
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
});
</script>
