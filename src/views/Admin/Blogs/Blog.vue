<template>
  <dashboard-layout>
    <base-row class="mb-30">
      <h2 class="f-h2">Blog</h2>
      <BaseButton title="Create" @onClick="openModal">
        <template #icon>
          <i class="la la-plus"></i>
        </template>
      </BaseButton>
    </base-row>

    <base-row class="shadow-normal p-8 round-10">
      <BaseTable :headers="['#Id', 'Name', 'Category', 'Status', 'Action']">
        <BlogTable :rows="blogRows" />
      </BaseTable>
      <blog-form
        :show.sync="show"
        :category-options="categoryRows"
        @on-close="show = false"
        @on-success="getBlogs"
      ></blog-form>
    </base-row>
  </dashboard-layout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import useBlog from "@/composables/useBlog";
import BlogForm from "./partials/BlogForm.vue";
import BlogTable from "./partials/BlogTable.vue";
import BaseTable from "../../../components/base/BaseTable.vue";
import useCategory from "@/composables/useCategories";

/** reactiuve & non reactive data*/
let show = ref(false);
const { blogRows, getBlogs } = useBlog();
const { categoryRows, getCategories } = useCategory();
/** computed properties */
/** functions */
const openModal = () => (show.value = true);
/** Watchers */
/** lifecycle hooks */
onMounted(() => {
  getBlogs();
  getCategories();
});
</script>

<style lang="scss" scoped></style>
