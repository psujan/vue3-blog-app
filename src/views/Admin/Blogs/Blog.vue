<template>
  <dashboard-layout>
    <base-row class="mb-30">
      <h1 class="f-h1">Blog</h1>
      <BaseButton title="Create" @onClick="openModal(null)">
        <template #icon>
          <i class="la la-plus"></i>
        </template>
      </BaseButton>
    </base-row>

    <base-row class="shadow-normal p-8 round-10">
      <BaseTable :headers="['#Id', 'Name', 'Category', 'Status', 'Action']">
        <BlogTable
          :rows="blogRows"
          @handle-on-edit="openModal"
          @handle-on-delete="(id:string)=>deleteRow(id)"
        />
      </BaseTable>
      <blog-form
        v-model:show="show"
        :category-options="categoryRows"
        @on-success="getBlogs"
        :row="row"
      ></blog-form>
    </base-row>
  </dashboard-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import useBlog from "@/composables/useBlog";
import BlogForm from "./partials/BlogForm.vue";
import BlogTable from "./partials/BlogTable.vue";
import BaseTable from "../../../components/base/BaseTable.vue";
import useCategory from "@/composables/useCategories";
import type { BlogRow } from "@/types";
import { showToast, useMessage } from "@/composables/useToast";
import { SWR } from "@/common/constant";

/** reactiuve & non reactive data*/
let show = ref<boolean>(false);
let row = ref<BlogRow>(null);
const { blogRows, getBlogs, deleteBlog } = useBlog();
const { categoryRows, getCategories } = useCategory();
/** computed properties */
/** functions */
const openModal = (rowData: BlogRow = null) => {
  show.value = true;
  row.value = rowData;
};

const deleteRow = async (id: string) => {
  let res = await deleteBlog(id);
  if (res) {
    showToast(useMessage("Blog", "delete"), "success");
    getBlogs();
  } else {
    showToast(SWR, "error");
  }
};
/** Watchers */
/** lifecycle hooks */
onMounted(() => {
  getBlogs();
  getCategories();
});
</script>

<style lang="scss" scoped></style>
