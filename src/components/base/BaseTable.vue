<template>
  <div class="base-table">
    <table>
      <thead>
        <tr>
          <th v-for="(column, i) in headers" :key="i">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <slot>
          
        </slot>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  headers: {
    required: true,
    type: Array,
  },
});
</script>

<style lang="scss" src="@/assets/saas/components/table.scss"></style>
