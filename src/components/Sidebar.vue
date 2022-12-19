<template>
  <div class="sidebar">
    <div class="sidebar-head">
      <div class="sidebar-head-title">
        <BaseLogo color="#fff" class="mb-20 pt-6 pb-6"/>
      </div>
    </div>
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
import BaseLogo from "./base/BaseLogo.vue"
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

.sidebar-main a {
  font-weight: 500;
  border-radius: 10px;
  color:$gray-white-color-80;
  transition:all 0.4s ease;
}

.sidebar-main a:hover {
  color: $white;
}
</style>
