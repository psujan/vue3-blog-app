<template>
  <div class="b-wrap">
    <div class="b-single bdr-bottom pt-30 pb-30">
      <h2 class="f-h2 w-70 mb-15">Reading Topics</h2>
      <ul class="flx reading-category" v-if="computedReadingList.length">
        <li
          class="pl-4 pr-4 mb-10"
          v-for="(row, i) in computedReadingList"
          :key="i"
        >
          <router-link
            :to="`?category=${modifiedCategoryName(row.name)}`"
            class="page-btn-tag"
            >{{ row.name }}</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useBlogStore } from "@/store/blog";
/**
 * composable
 */
const blogStore = useBlogStore();
/**
 * emits
 */
const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
}>();
/**
 * computed properties
 */
const computedReadingList = computed(() => {
  return blogStore.statusByCategory;
});
/**
 * functions
 */
const modifiedCategoryName = (name: string) => {
  return name.trim().replace('&',"and");
};
</script>
<style lang="scss" scoped>
@import "../../assets/saas/variables.scss";
.b-single {
  h2 {
    line-height: 1.55;
  }
}
.b-info {
  font-size: 12px;
  .bdr-right {
    border-right: 1px solid #ccc;
  }
}
.reading-category {
  flex-wrap: wrap;
}

.page-btn-tag{
  transition:0.3s ease;
  &:hover{
    background-color: $primary-color;
    color:#fff;
  }
}
</style>
