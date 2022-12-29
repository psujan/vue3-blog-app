<template>
  <footer>
    <div class="text-center pt-10 pb-10">
      <p class="clr-black">
        Thankyou for your visit!!
        <Transition name="beat"><span class="heart"> ❤ </span></Transition>
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@import "../../assets/saas/variables.scss";
footer {
  background-color: $gray-color-light;
}
.heart {
  font-size: 1.3rem;
  color: #e00;
  // animation: beat 1s infinite alternate;
  // transform-origin: center;
}
</style>
