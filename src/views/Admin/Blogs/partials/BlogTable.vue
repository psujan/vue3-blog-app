<template>
  <tr v-for="(row, i) in rows" :key="i">
    <td>{{ row.id }}</td>
    <td>{{ row.title }}</td>
    <td>{{ row.category }}</td>
    <td>{{ row.reading_time }}</td>
    <td>{{ row.status ? "Active" : "Inactive" }}</td>
    <td v-if="showActions">
      <CrudActions
        @onEdit="handleOnEdit(row)"
        @onDelete="confirmDelete(row.id as string)"
      ></CrudActions>
    </td>
  </tr>
  <confirm-modal v-model:show="showConfirmModal" @onConfirm="handleDelete" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { BlogObject } from "@/types";
import CrudActions from "../../../../components/ui/CrudActions.vue";

interface Props {
  rows?: BlogObject[];
  showActions?: boolean;
}
withDefaults(defineProps<Props>(), {
  showActions: true,
});

/**
 * Emitted events
 */
const emit = defineEmits<{
  (e: "handleOnEdit", row: BlogObject): void;
  (e: "handleOnDelete", id: string): void;
}>();
/**
 * data
 */
const showConfirmModal = ref(false);
const currentBlogId = ref("");
/**
 * functions
 */
const handleOnEdit = (row: BlogObject) => {
  emit("handleOnEdit", row);
};

const confirmDelete = (id: string) => {
  currentBlogId.value = id;
  showConfirmModal.value = true;
};

const handleDelete = (canDelete: boolean) => {
  if (!canDelete) {
    currentBlogId.value = "";
    return;
  }
  emit("handleOnDelete", currentBlogId.value);
};
</script>

<style lang="scss" scoped></style>
