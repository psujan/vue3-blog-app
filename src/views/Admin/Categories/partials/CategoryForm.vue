<template>
  <base-modal
    :title="`${row ? 'Edit' : 'Add'} Category`"
    @on-close="closeModal"
    :show="show"
    :width="600"
  >
    <Form @submit="onSubmit" ref="blogForm" :key="formRenderKey">
      <base-row>
        <input-text
          label="Name"
          name="name"
          :rules="{ required: true }"
          fieldClass="col-12 mb-18"
          v-model="form.name"
        />
      </base-row>
      <base-row>
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
              Category {{ isSubmitting ? "..." : "" }}</base-button
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
import { reactive, ref, watch } from "vue";
import { Form } from "vee-validate";
import useCategory from "@/composables/useCategories";
import { useForm, useField } from "vee-validate";
import { showToast, useMessage } from "@/composables/useToast";
import { SWR } from "@/common/constant";
import type { CategoryOption, CategoryFormFields } from "@/types";

/**Interfaces */
interface Props {
  show: boolean;
  row: CategoryOption | null;
}

/**Props */
const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
  (e: "update:show", v: boolean): void;
  (e: "onSuccess"): void;
}>();

/** reactive/non-reactive data */
const formFields: CategoryFormFields = {
  name: "",
};
let form = reactive<CategoryFormFields>({ ...formFields });
let formRenderKey = ref(1);
let isSubmitting = ref(false);

/**Composables */
const { createCategory, updateCategory } = useCategory();
const { resetForm } = useForm();
const { resetField } = useField("field", (value) => !!value);

/**Methods */
const onSubmit = async () => {
  isSubmitting.value = true;
  try {
    let res = null;
    if (props.row) {
      const id: string = (props.row ? props.row.id : "") as string;
      res = await updateCategory({ ...form }, id);
    } else {
      res = await createCategory({ ...form });
    }
    if (res) {
      emit("onSuccess");
      closeModal();
      showToast(
        useMessage("Category", props.row ? "update" : "create"),
        "success"
      );
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
      name: "",
    },
  });
  resetField();
  formRenderKey.value++;
  emit("update:show", false);
};

const setFormData = (data: CategoryOption) => {
  const { name } = data;
  form.name = name;
};

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      resetForm({
        values: {
          name: "",
        },
      });
    }
  }
);

watch(
  () => props.row,
  (newRow) => {
    if (newRow && typeof newRow == "object") {
      setFormData(newRow as CategoryOption);
    }
  }
);
</script>

<style></style>
