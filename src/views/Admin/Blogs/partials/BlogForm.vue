<template>
  <base-modal title="Add blog" @on-close="closeModal" :show="show">
    <Form @submit="onSubmit" ref="blogForm" :key="formRenderKey">
      <base-row v-for="(item, i) in formContainer" :key="i">
        <component
          :is="item.componentValue"
          v-bind="{
            ...item.properties,
          }"
          v-model="form[item.formKey]"
        ></component>
      </base-row>
      <base-row>
        <div class="w-12">
          <div class="flx flx-end mt-15">
            <base-button class="mr-9">Add Blog</base-button>
            <base-button class="outline" @click.stop="closeModal"
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
import { reactive, ref, computed, watch } from "vue";
import { Form } from "vee-validate";
import InputText from "../../../../components/form/InputText.vue";
import InputSelect from "../../../../components/form/InputSelect.vue";
import InputRadio from "../../../../components/form/InputRadio.vue";
import useBlog from "@/composables/useBlog";
import { useForm, useField } from "vee-validate";
/**Interfaces */
interface categoryOption {
  id: string | number;
  name: string;
}
interface Props {
  categoryOptions: categoryOption[];
  show: boolean;
}

/**Props */
const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
  (e: "onClose"): void;
  (e: "onSuccess"): void;
}>();

/**Data */
const formFields = {
  title: "",
  category: "",
  status: "",
  content: "",
};

let form = reactive({ ...formFields });
const blogForm = ref(null);
const formRenderKey = ref(1);

/**Composables */
const { createBlog } = useBlog();

const { resetForm } = useForm();
const { resetField } = useField("field", (value) => !!value);

/**Computed Properties */
const formContainer = computed(() => {
  return [
    {
      componentValue: InputText,
      properties: {
        label: "Title",
        name: "title",
        rules: { required: true },
        fieldClass: "w-12 mb-18",
        modelValue: form.title,
      },
      formKey: "title",
    },
    {
      componentValue: InputSelect,
      properties: {
        label: "Category",
        name: "category",
        rules: { required: true },
        modelValue: form.category,
        options: props.categoryOptions.length
          ? props.categoryOptions.map(({ name }) => {
              return {
                value: name,
                name: name,
              };
            })
          : [],
        fieldClass: "w-12 mb-18",
      },
      formKey: "category",
    },
    {
      componentValue: InputRadio,
      properties: {
        label: "Status",
        name: "status",
        rules: { required: true },
        modelValue: form.status,
        options: [
          { name: "Active", value: "active" },
          { name: "Inactive", value: "inactive" },
        ],
        fieldClass: "w-12 mb-18",
      },
      formKey: "status",
    },
    {
      componentValue: InputCkEditor,
      properties: {
        label: "Content",
        name: "content",
        rules: { required: true },
        modelValue: form.content,
        fieldClass: "w-12 mb-18",
      },
      formKey: "content",
    },
  ];
});

/**Methods */
const onSubmit = async () => {
  console.log("submitting", form);
  createBlog(form);
  emit("onSuccess");
  closeModal();
};

const resetFormValue = () => {
  console.log("resetting");
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
  console.log("here closing", r);
  emit("onClose");
};

watch(
  () => props.show,
  (newVal, oldVal) => {
    console.log("watching", newVal, oldVal);
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
</script>

<style>
@import "../../../../assets/saas/components/form.scss";
</style>
