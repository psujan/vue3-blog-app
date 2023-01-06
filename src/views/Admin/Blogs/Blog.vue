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

    <div class="shadow-normal p-8 round-10">
      <BaseTable :headers="['#Id', 'Name', 'Category', 'Status', 'Action']">
        <BlogTable
          :rows="rows[currentPage - 1]"
          @handle-on-edit="openModal"
          @handle-on-delete="(id:string)=>deleteRow(id)"
        />
      </BaseTable>
    </div>
    <pagination-links
      :current-page="currentPage"
      :total-pages="rows.length"
      @page-change="setCurrentPage"
    />

    <template #modals>
      <blog-form
        v-model:show="show"
        :category-options="categoryRows"
        @on-success="getBlogs"
        :row="row"
      ></blog-form>
    </template>
  </dashboard-layout>
</template>

<script setup lang="ts">
import PaginationLinks from "../../../components/ui/PaginationLinks.vue";
import { ref, watch, onMounted } from "vue";
import useBlog from "@/composables/useBlog";
import BlogForm from "./partials/BlogForm.vue";
import BlogTable from "./partials/BlogTable.vue";
import BaseTable from "../../../components/base/BaseTable.vue";
import useCategory from "@/composables/useCategories";
import type { BlogRow } from "@/types";
import { showToast, useMessage } from "@/composables/useToast";
import usePagination from "@/composables/usePagination";
import { SWR } from "@/common/constant";

/** reactiuve & non reactive data*/
const currentPage = ref<number>(1);
const show = ref<boolean>(false);
const rows = ref<any[]>([]);
const row = ref<BlogRow>(null);
const { blogRows, getBlogs, deleteBlog } = useBlog();
const { categoryRows, getCategories } = useCategory();
const { chunkItems } = usePagination();
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
    setCurrentPage(1);
    getBlogs();
  } else {
    showToast(SWR, "error");
  }
};
const setCurrentPage = (pageNo: number) => {
  currentPage.value = pageNo;
};
/** Watchers */
watch(blogRows, (newRow) => {
  if (newRow && newRow.length) {
    rows.value = chunkItems(newRow as []);
  }
});
/** lifecycle hooks */
onMounted(() => {
  getBlogs();
  getCategories();
});
</script>

<style lang="scss" scoped></style>
