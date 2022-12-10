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
        <BlogTable />
      </BaseTable>
      <base-modal :show.sync="show" title="Add Blog" @onClose="closeModal">
        <blog-form></blog-form>
      </base-modal>
    </base-row>
  </dashboard-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BlogForm from "./partials/BlogForm.vue";
import BlogTable from "./partials/BlogTable.vue";
import BaseTable from "../../../components/base/BaseTable.vue";

let show = ref(false);
const openModal = () => (show.value = true);

const closeModal = () => (show.value = false);
</script>

<style lang="scss" scoped></style>
