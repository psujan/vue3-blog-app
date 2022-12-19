<template>
  <tr v-for="(row, i) in rows" :key="i">
    <td>{{ row.id }}</td>
    <td>{{ row.title }}</td>
    <td>{{ row.category }}</td>
    <td>{{ row.status ? "Active" : "Inactive" }}</td>
    <td>
      <CrudActions></CrudActions>
    </td>
  </tr>
  <template> </template>
</template>

<script setup lang="ts">
import CrudActions from "../../../../components/CrudActions.vue";
interface row {
  id: "";
  title: "";
  status: "";
  category: "";
}

interface Props {
  rows?: row[];
}
defineProps<Props>();
</script>

<style lang="scss" scoped></style>
