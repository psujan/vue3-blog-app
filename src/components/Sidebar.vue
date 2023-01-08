<template>
  <div class="sidebar">
    <div class="sidebar-head">
      <div class="sidebar-head-title">
        <BaseLogo color="#100b0b" class="mb-30 pt-6 pb-6" />
      </div>
    </div>
    <!-- <base-button class="w-100 mb-20">Add Blog</base-button> -->
    <div class="sidebar-main">
      <ul>
        <li>
          <router-link
            to="/dashboard"
            class="clr-gray f-body pl-5 pr-5 pt-8 pb-8 d-block"
          >
            <i class="sidebar-icon las la-tachometer-alt mr-10"></i>
            <span>Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/dashboard/categories"
            class="clr-gray f-auto pl-5 pr-5 pt-8 pb-8 d-block"
          >
            <i class="sidebar-icon las la-sitemap mr-10"></i>
            <span>Categories</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/dashboard/blogs"
            class="clr-gray f-auto pl-5 pr-5 pt-8 pb-8 d-block"
          >
            <i class="sidebar-icon las la-blog mr-10"></i>
            <span>Blogs</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseLogo from "./base/BaseLogo.vue";
</script>

<style scoped lang="scss" src="@/assets/saas/views/sidebar.scss"></style>

<style scoped lang="scss">
@import "../assets/saas/variables.scss";

.sidebar-icon {
  width: 20px;
  height: 20px;
  padding: 4px;
  text-align: center;
}

.sidebar-main {
  a {
    font-weight: 400;
    border-radius: 10px;
    padding: 12px;
    margin: 4px 0;
    color: rgb(73, 70, 70);
    transition: 0.4s ease;
    &:hover{
      color: $primary-color;
    }
  }
}
</style>
