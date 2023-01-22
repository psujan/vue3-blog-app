<template>
  <base-modal
    :title="`${row ? 'Edit' : 'Add'} Blog`"
    @on-close="closeModal"
    :show="show"
  >
    <div class="p-20">
      <Form @submit="onSubmit" ref="blogForm" :key="formRenderKey">
        <base-row>
          <input-text
            label="Title"
            name="title"
            :rules="{ required: true }"
            fieldClass="col-12 mb-18"
            v-model="form.title"
          />
        </base-row>
        <base-row>
          <input-select
            label="Category"
            name="category"
            :rules="{ required: true }"
            fieldClass="col-12 mb-18"
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
            fieldClass="col-12 mb-18"
            v-model="form.status"
            :options="[
              { name: 'Active', value: 'active' },
              { name: 'Inactive', value: 'inactive' },
            ]"
          />
        </base-row>
        <base-row>
          <input-text
            label="Reading Time (In min)"
            name="reading time"
            :rules="{ required: true, numeric: true }"
            fieldClass="col-12 mb-18"
            v-model="form.reading_time"
          />
        </base-row>
        <base-row>
          <input-quill-editor
            fieldClass="col-12 mb-18"
            v-model="form.content"
            label="Content"
            name="content"
            :rules="{ required: true }"
          />
        </base-row>
        <base-row class="submit-row">
          <div class="col-12">
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
              <base-button
                class="outline outline-hover"
                @click.stop="closeModal"
                >Close</base-button
              >
            </div>
          </div>
        </base-row>
      </Form>
    </div>
  </base-modal>
</template>

<script setup lang="ts">
import InputQuillEditor from '../../../../components/form/InputQuillEditor.vue'
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
  reading_time: "",
  created_at: "",
  updated_at: "",
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
      res = await updateBlog({ ...form, updated_at: Date.now() }, blogId);
    } else {
      const dt = Date.now();
      res = await createBlog({ ...form, created_at: dt, updated_at: dt });
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
      reading_time: "",
    },
  });
  resetField();
  formRenderKey.value++;
  emit("update:show", false);
};

const setFormData = (data: BlogObject) => {
  const { title, category, status, reading_time, content, created_at } = data;
  form.title = title;
  form.category = category;
  form.status = status == 1 ? "active" : "inactive";
  form.reading_time = reading_time;
  form.content = content;
  form.created_at = created_at;
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
    if (newRow && typeof newRow == "object") {
      setFormData(newRow as BlogObject);
    }
  }
);
</script>

<style scoped>
.submit-row{
  margin-top:7rem;
}
</style>
