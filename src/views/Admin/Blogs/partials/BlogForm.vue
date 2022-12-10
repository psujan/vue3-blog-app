<template>
  <div>
    <Form>
      <base-row class="">
        <input-text
          label="Title"
          :rules="{ required: true }"
          name="title"
          :vmodel.sync="form.title"
        />
        <input-select
          label="Category"
          :rules="{ required: true }"
          name="category"
          :vmodel.sync="form.category"
          :options="categoryOptions"
        />
      </base-row>
      <base-row class="">
        <input-radio
          label="Status"
          :rules="{ required: false }"
          name="status"
          :vmodel.sync="form.status"
          :options="statusOptions"
        />
      </base-row>
      <base-row>
        <input-text-area
          label="Content"
          name="content"
          :rules="{ required: true }"
          :vmodel.sync="form.content"
          field-class="w-12 mb-18"
        />
      </base-row>
      <base-row>
        <div class="w-12">
          <div class="flx flx-end mt-15">
            <base-button class="mr-9">Add Blog</base-button>
            <base-button class="outline">Close</base-button>
          </div>
        </div>
      </base-row>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Form } from "vee-validate";
import InputText from "../../../../components/form/InputText.vue";
import InputSelect from "../../../../components/form/InputSelect.vue";
import InputRadio from "../../../../components/form/InputRadio.vue";
import InputTextArea from "../../../../components/form/InputTextArea.vue";

let form = reactive({
  title: "",
  category: "",
  status: "",
  content: "",
});

let categoryOptions = reactive([
  {
    name: "Politics",
    value: "politics",
  },
  {
    name: "Fashion",
    value: "fashion",
  },
  {
    name: "Culture",
    value: "culture",
  },
  {
    name: "Travel & Blog",
    value: "travel&blog",
  },
  {
    name: "Movies & Entertainment",
    value: "movies&entertainment",
  },
]);

let statusOptions = [
  { name: "Active", value: "active" },
  { name: "Inactive", value: "inactive" },
];
</script>

<style>
@import "../../../../assets/saas/components/form.scss";
</style>
