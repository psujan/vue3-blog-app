<template>
  <tr v-for="(row, i) in rows" :key="i">
    <td>{{ row.id }}</td>
    <td>{{ row.name }}</td>
    <td>
      <CrudActions @onEdit="handleOnEdit(row)" :delete="false"></CrudActions>
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { CategoryOption } from "@/types";
import CrudActions from "../../../../components/ui/CrudActions.vue";

interface Props {
  rows?: CategoryOption[];
}
defineProps<Props>();

/**
 * Emitted events
 */
const emit = defineEmits<{
  (e: "handleOnEdit", row: CategoryOption): void;
}>();
/**
 * data
 */
/**
 * functions
 */
const handleOnEdit = (row: CategoryOption) => {
  emit("handleOnEdit", row);
};
</script>

<style lang="scss" scoped></style>
