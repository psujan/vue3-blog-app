<template>
  <div class="b-wrap">
    <template v-if="rows && rows.length">
      <router-link :to="`/blog/${row.id}`" v-for="(row, i) in rows" :key="i">
        <div class="b-single bdr-bottom">
          <h2 class="f-h2  mb-15">
            {{ row.title }}
          </h2>
          <p
            class="mb-30 mt-10 clr-gray f-auto w-70"
            v-html="getPartialText(row.content as string)"
          ></p>
          <div class="b-info pt-5 pb-5">
            <a href="javascript:;" class="page-btn-tag">{{ row.category }}</a>
            <div class="d-inline-flex ml-10 pt-2 pb-2">
              <span class="bdr-right pl-8 pr-8"
                ><i class="la la-clock f-auto pr-3 f-auto"></i
                >{{ row.reading_time }} min read</span
              >
              <span class="pl-8 pr-8"
                ><i class="la la-calendar-alt pr-3 f-auto"></i>Added :
                {{ getReadableTimeFormat(row.created_at as string) }}</span
              >
            </div>
          </div>
        </div>
      </router-link>
    </template>
    <p v-else class="pt-50 pb-50">No Results Found</p>
  </div>
</template>

<script lang="ts" setup>
import type { BlogObject } from "@/types";
import { getPartialText, getReadableTimeFormat } from "@/common/helper";

interface Props {
  rows: BlogObject[];
}

const props = defineProps<Props>();
</script>
<style lang="scss" scoped>
@import "../../assets/saas/variables.scss";

.b-single {
  padding:1.2rem 0;
  h2 {
    cursor: pointer;
    line-height: 1.55;
    transition: color 0.3s ease;
    &:hover {
      color: $primary-color;
    }
  }
}
.b-info {
  font-size: 12px;
  .bdr-right {
    border-right: 1px solid #ccc;
  }
}
</style>
