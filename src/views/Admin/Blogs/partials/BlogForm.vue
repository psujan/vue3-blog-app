<template>
  <base-modal
    :title="`${row ? 'Edit' : 'Add'} Blog`"
    @on-close="closeModal"
    v-model:show="show"
  >
    <Form @submit="onSubmit" ref="blogForm" :key="formRenderKey">
      <base-row>
        <input-text
          label="Title"
          name="title"
          :rules="{ required: true }"
          fieldClass="w-12 mb-18"
          v-model="form.title"
        />
      </base-row>
      <base-row>
        <input-select
          label="Category"
          name="category"
          :rules="{ required: true }"
          fieldClass="w-12 mb-18"
          v-model="form.category"
          :options="
            categoryOptions.length
              ? categoryOptions.map(({ name }) => {
                  return {
                    value: name,
                    name: name,
                  };
                })
              : []
          "
        />
      </base-row>
      <base-row>
        <input-radio
          label="Status"
          name="status"
          :rules="{ required: true }"
          fieldClass="w-12 mb-18"
          v-model="form.status"
          :options="[
            { name: 'Active', value: 'active' },
            { name: 'Inactive', value: 'inactive' },
          ]"
        />
      </base-row>
      <base-row>
        <input-ck-editor
          label="Content"
          name="content"
          :rules="{ required: true }"
          fieldClass="w-12 mb-18"
          v-model="form.content"
        />
      </base-row>
      <base-row>
        <div class="w-12">
          <div class="flx flx-end mt-15">
            <base-button class="mr-9"
              >{{
                row
                  ? isSubmitting
                    ? "Updating"
                    : "Update"
                  : isSubmitting
                  ? "Adding"
                  : "Add"
              }}
              Blog {{ isSubmitting ? "..." : "" }}</base-button
            >
            <base-button class="outline outline-hover" @click.stop="closeModal"
              >Close</base-button
            >
          </div>
        </div>
      </base-row>
    </Form>
  </base-modal>
</template>

<script setup lang="ts">
import InputCkEditor from "../../../../components/form/InputCkEditor.vue";
import { reactive, ref, watch } from "vue";
import { Form } from "vee-validate";
import InputText from "../../../../components/form/InputText.vue";
import InputSelect from "../../../../components/form/InputSelect.vue";
import InputRadio from "../../../../components/form/InputRadio.vue";
import useBlog from "@/composables/useBlog";
import { useForm, useField } from "vee-validate";
import { showToast, useMessage } from "@/composables/useToast";
import { SWR } from "@/common/constant";
import type {
  CategoryOption,
  BlogFormFields,
  BlogRow,
  BlogObject,
} from "@/types";

/**Interfaces */
interface Props<CategoryOption, BlogRow> {
  categoryOptions: CategoryOption[];
  show: boolean;
  row: BlogRow;
}

/**Props */
const props = defineProps<Props<CategoryOption, BlogRow>>();

// Emits
const emit = defineEmits<{
  (e: "update:show", v: boolean): void;
  (e: "onSuccess"): void;
}>();

/** reactive/non-reactive data */
const formFields: BlogFormFields = {
  title: "",
  category: "",
  status: "",
  content: "",
};
let form = reactive<BlogFormFields>({ ...formFields });
const blogForm = ref(null);
let formRenderKey = ref(1);
let isSubmitting = ref(false);
// let formContainer = ref<any>([]);

/**Composables */
const { createBlog, updateBlog } = useBlog();
const { resetForm } = useForm();
const { resetField } = useField("field", (value) => !!value);

/**Methods */
const onSubmit = async () => {
  isSubmitting.value = true;
  try {
    let res = null;
    if (props.row) {
      const blogId: string = (props.row ? props.row.id : "") as string;
      res = await updateBlog({ ...form }, blogId);
    } else {
      res = await createBlog(form);
    }
    if (res) {
      emit("onSuccess");
      closeModal();
      showToast(useMessage("Blog", props.row ? "update" : "create"), "success");
    } else {
      showToast(SWR, "error");
    }
  } finally {
    isSubmitting.value = false;
  }
};

const resetFormValue = () => {
  Object.assign(form, formFields);
};

const closeModal = async () => {
  resetFormValue();
  const r = resetForm({
    values: {
      title: "",
      status: "",
      category: "",
      content: "",
    },
  });
  resetField();
  formRenderKey.value++;
  emit("update:show", false);
};

const setFormData = (data: BlogObject) => {
  const { title, category, status, content } = data;
  form.title = title;
  form.category = category;
  form.status = status == 1 ? "active" : "inactive";
  form.content = content;
  console.log("here setting form", form);
};

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      resetForm({
        values: {
          title: "",
          status: "",
          category: "",
          content: "",
        },
      });
    }
  }
);

watch(
  () => props.row,
  (newRow) => {
    console.log("watching row", newRow);
    if (newRow && typeof newRow == "object") {
      setFormData(newRow as BlogObject);
    }
  }
);
</script>

<style>
@import "../../../../assets/saas/components/form.scss";
</style>
