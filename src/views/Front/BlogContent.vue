<template>
  <BasePage>
    <div class="container">
      <div class="row flx-x-ctr">
        <div class="col-8 blog-list-col">
          <div class="b-single pt-30 pb-30" v-if="row">
            <h2 class="f-h2 mb-30">
              {{ row.title }}
            </h2>
            <p
              class="mb-30 mt-10 f-auto content"
              v-html="row.content"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </BasePage>
</template>

<script lang="ts" setup>
import BasePage from "../../components/layouts/BasePage.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import useBlog from "@/composables/useBlog";
import type { BlogObject } from "@/types";
/**
 * composable
 */
const route = useRoute();
const { getBlogById } = useBlog();
/**
 * reactive data
 */
const blogId = ref("");
const row = ref("");

onMounted(async () => {
  blogId.value = route.params.id as string;
  const res = await getBlogById(blogId.value);
  row.value = res?.data;
});
</script>

<style scoped>
.blog-list-col {
  min-height: 90vh;
}
</style>

<style>
.content pre {
  background: #000;
  color: #fff;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
}
</style>
