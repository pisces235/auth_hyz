<template>
  <div class="container justify-center">
    <div class="top-bg absolute-top z-0">
      <img
        src="/images/wood-base.png"
        alt=""
        class="top-bg_img width-percentage-100"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import '../../css/app.scss';

.container {
  .top-bg {
    &__img {
      z-index: 0;
    }
  }
  .title {
    z-index: 2;
  }
}
</style>
