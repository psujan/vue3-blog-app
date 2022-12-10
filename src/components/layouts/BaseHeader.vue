<template>
  <header class="header">
    <div class="container flx flx-x-btwn flx-y-ctr">
      <BaseLogo />
      <nav class="header-nav">
        <ul class="flx">
          <li class="header-nav-item">
            <a href="#overview" class="header-nav-link">Overview</a>
          </li>
          <li class="header-nav-item">
            <a href="#features" class="header-nav-link">Features</a>
          </li>
          <li class="header-nav-item">
            <a href="javascript:;" class="header-nav-link">Pricing</a>
          </li>
        </ul>
      </nav>
      <div>
        <base-button
          title="View On Github"
          :btnClass="['page-btn', 'page-btn-dark', 'page-btn-round']"
          @clicked="redirectToGithub"
        >
          <template #icon>
            <span class="f-auto"><i class="lab la-github"></i></span>
          </template>
        </base-button>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import BaseLogo from '../base/BaseLogo.vue';
//methods
function redirectToGithub(e: Event): void {
  console.log("redirecting ...", e);
}
</script>

<style scoped lang="scss" src="@/assets/saas/views/header.scss"></style>
