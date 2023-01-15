<template>
  <div>
    <BaseTable
      :headers="['#Id', 'Name', 'Category', 'Reading Time', 'Status']"
    >
      <BlogTable :rows="rows" :show-actions="false"/>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import BlogTable from '../../Blogs/partials/BlogTable.vue'
import type { BlogObject } from "@/types";

interface Props {
  rows: BlogObject[];
}
const props = defineProps<Props>();
/**
 * functions
 */
</script>

<style lang="scss" scoped></style>
