<template>
  <ul class="pagination mt-20 mb-20">
    <li class="pagination-item">
      <button
        type="button"
        :class="currentPage === 1 ? 'active' : ''"
        @click="onClickFirstPage"
        :disabled="computedIsInFirstPage"
        aria-label="first page"
      >
        First
      </button>
    </li>
    <li class="pagination-item">
      <button
        type="button"
        @click="onClickPreviousPage"
        :disabled="computedIsInFirstPage"
        aria-label="Go to previous page"
      >
        Prev
      </button>
    </li>
    <li v-for="{ page, isDisabled } in computedPages" class="pagination-item">
      <button
        type="button"
        @click="onClickPage(page)"
        :disabled="isDisabled"
        :class="{ pageActive: isPageActive(page) }"
        :aria-label="`Go to page number ${page}`"
      >
        {{ page }}
      </button>
    </li>
    <li class="pagination-item">
      <button
        type="button"
        @click="onClickNextPage"
        :disabled="computedIsInLastPage"
        aria-label="Go to next page"
      >
        Next
      </button>
    </li>
    <li class="pagination-item">
      <button
        type="button"
        @click="onClickLastPage"
        :disabled="computedIsInLastPage"
        aria-label="Go to last page"
      >
        Last
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
/**Imports */
import { ref, computed } from "vue";
/**
 * constants
 */
/**
 * Props
 */
interface PageObject {
  name: string;
  isDisabled: boolean;
}
interface Props {
  currentPage: number;
  totalPages: number;
  totalVisibleLinks?: number;
}
const props = withDefaults(defineProps<Props>(), {
  totalVisibleLinks: 3,
});
/**
 * Emits
 */
const emit = defineEmits<{
  (e: "pageChange", v: number): void;
}>();
/**
 * Reactive data
 */
/**
 * Computed
 */
const computedStartPage = computed(() => {
  if (props.currentPage === 1) {
    return 1;
  }

  if (props.currentPage === props.totalPages) {
    if (props.totalPages > props.totalVisibleLinks) {
      return props.totalPages - props.totalVisibleLinks + 1;
    }
    return 1;
  }

  return props.currentPage - 1;
});
const computedEndPage = computed(() => {
  return Math.min(
    computedStartPage.value + props.totalVisibleLinks - 1,
    props.totalPages
  );
});
const computedPages = computed(() => {
  const pages = [];
  for (let i = computedStartPage.value; i <= computedEndPage.value; i++) {
    pages.push({
      page: i,
      isDisabled: i === props.currentPage,
    });
  }
  return pages;
});

const computedIsInFirstPage = computed(() => {
  return props.currentPage === 1;
});
const computedIsInLastPage = computed(() => {
  return props.currentPage === props.totalPages;
});

/**
 * Functions
 */
const onClickFirstPage = () => {
  emit("pageChange", 1);
};
const onClickNextPage = () => {
  emit("pageChange", props.currentPage + 1);
};
const onClickLastPage = () => {
  emit("pageChange", props.totalPages);
};
const onClickPreviousPage = () => {
  emit("pageChange", props.currentPage - 1);
};
const onClickPage = (pageName: number) => {
  emit("pageChange", pageName);
};
const isPageActive = (pageNumber: number) => {
  return props.currentPage === pageNumber;
};
/**
 * Watchers
 */
/**
 * Lifecycle
 */
</script>

<style lang="scss" scoped>
@import "../../assets/saas/variables.scss";

.pagination {
  display: inline-flex;
}
.pagination-item {
  padding: 0 3px;
  button {
    width: 34px;
    height: 34px;
    text-align: center;
    color: $black-color;
    background-color: #fff;
    padding: 4px;
    font-size: 12px;
    font-family: inherit;
    outline: none;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
      background-color: rgba(239, 239, 239, 0.3);
    }
  }
}

.pageActive {
  background-color: $primary-color !important;
  color: #fff !important;
}

@media screen and (max-width: $small) {
  .pagination-item {
    button {
      width:28px;
      height:28px;
      padding:2px;
    }
  }
}
</style>
