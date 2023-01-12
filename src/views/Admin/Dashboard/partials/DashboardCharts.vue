<template>
  <div class="col-8">
    <div class="p-12 b-white round-10">
      <h5>By Category</h5>
      <apexchart
        type="bar"
        :height="445"
        :options="chartOptions"
        :series="computedSeries"
      />
    </div>
  </div>
  <div class="col-4 flx-y-self-start">
    <div class="p-12 b-white round-10">
      <h5>By Status</h5>
      <apexchart type="donut" :options="statusOptions" :series="statusSeries" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
interface Props {
  statusSeries: [number, number];
  categories: string[];
  activeArray: number[];
  inactiveArray: number[];
}

// Props
const props = withDefaults(defineProps<Props>(), {});

// chart options for bar chart
const chartOptions = computed(() => {
  return {
    chart: {
      type: "bar",
      height: 430,
      toolbar:{
        show:false
      }
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
      categories: props.categories,
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
  };
});

//chart series for bar chart
const computedSeries = computed(() => {
  return [
    {
      name: "Active",
      data: props.activeArray,
    },
    {
      name: "Inactive",
      data: props.inactiveArray,
    },
  ];
});

// chart options for donut chart
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
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
});
</script>
