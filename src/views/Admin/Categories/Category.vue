<template>
  <dashboard-layout>
    <div class="container">
      <base-row class="mb-18">
        <div class="col-12">
          <div class="flx flx-x-btwn">
            <h1 class="f-h2">Categories</h1>
            <BaseButton title="Create" @onClick="openModal(null)">
              <template #icon>
                <i class="la la-plus"></i>
              </template>
            </BaseButton>
          </div>
        </div>
      </base-row>
      <base-row>
        <div class="col-12">
          <div class="p-8 round-10 b-white">
            <BaseTable :headers="['#Id', 'Name', 'Action']">
              <CategoryTable
                :rows="rows[currentPage - 1]"
                @handle-on-edit="openModal"
              />
            </BaseTable>
          </div>
        </div>
      </base-row>
      <pagination-links
        :current-page="currentPage"
        :total-pages="rows.length"
        @page-change="setCurrentPage"
      />
    </div>
    <template #modals>
      <category-form
        v-model:show="show"
        :category-options="categoryRows"
        @on-success="getCategories"
        :row="row"
      ></category-form>
    </template>
  </dashboard-layout>
</template>

<script setup lang="ts">
import PaginationLinks from "../../../components/ui/PaginationLinks.vue";
import { ref, watch, onMounted } from "vue";
import useCategory from "@/composables/useCategories";
import CategoryForm from "./partials/CategoryForm.vue";
import CategoryTable from "./partials/CategoryTable.vue";
import BaseTable from "../../../components/base/BaseTable.vue";
import { showToast, useMessage } from "@/composables/useToast";
import usePagination from "@/composables/usePagination";
import { SWR } from "@/common/constant";
import type { CategoryOption } from "@/types";

/** reactiuve & non reactive data*/
const currentPage = ref<number>(1);
const show = ref<boolean>(false);
const rows = ref<any[]>([]);
const row = ref<null | CategoryOption>(null);
const { categoryRows, getCategories } = useCategory();
const { chunkItems } = usePagination();
/** computed properties */
/** functions */
const openModal = (rowData: null | CategoryOption = null) => {
  show.value = true;
  row.value = rowData as CategoryOption;
};

const setCurrentPage = (pageNo: number) => {
  currentPage.value = pageNo;
};
/** Watchers */
watch(categoryRows, (newRow) => {
  if (newRow && newRow.length) {
    rows.value = chunkItems(newRow as []);
  }
});
/** lifecycle hooks */
onMounted(() => {
  getCategories();
});
</script>

<style lang="scss" scoped></style>
