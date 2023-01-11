<template>
  <div class="flx crud-action">
    <a href="javascript:;" title="View" class="pl-4 pr-4 mb-3" v-if="show">
      <i class="las la-eye"></i>
    </a>
    <a href="javascript:;" title="Edit" @click="$emit('onEdit')" v-if="edit">
      <i class="las la-edit"></i>
    </a>
    <a
      href="javascript:;"
      title="Delete"
      @click="$emit('onDelete')"
      v-if="delete"
    >
      <i class="las la-trash"></i>
    </a>
  </div>
</template>

<script setup lang="ts">
interface Props {
  show: boolean;
  edit: boolean;
  delete: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  edit: true,
  delete: true,
});
</script>

<style lang="scss" scoped>
@import "../../assets/saas/variables.scss";
.crud-action {
  a {
    font-size: 15px;
    font-weight: 900;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: 0.3s ease;
    padding: 4px;
    margin-right: 8px;
    background: $primary-color;
    // color:$gray-color-medium;
    color: $white;
  }
}
</style>
