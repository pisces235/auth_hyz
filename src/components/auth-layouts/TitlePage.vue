<template>
  <div
    class="contain-title row justify-center relative-position width-percentage-100"
  >
    <div class="title-smaller">
      <div class="title">
        <div class="title--front"></div>
        <div
          class="title--front-duplicate f-size-md row justify-center relative-position"
        >
          <div class="dot dot-left w-fit-content"></div>
          <p>{{ title_page }}</p>
          <div class="dot dot-right w-fit-content"></div>
        </div>
        <div class="title--back"></div>
      </div>
      <div class="title-bg">
        <img src="/images/pattern.png" alt="" class="align-center" />
      </div>
    </div>
    <div class="title-bigger">
      <div class="title">
        <div class="title--front"></div>
        <div class="title--front-duplicate f-size-md"></div>
        <div class="title--back"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title_page?: string
}
withDefaults(defineProps<Props>(), {})
</script>

<style lang="scss" scoped>
@import '../../css/app.scss';

.contain-title {
  margin-left: 10px;
  .title-smaller {
    @include special-bg(200px, 40px, 8px, 14px);
    z-index: 1;
    position: relative;
    .title {
      &--front-duplicate {
        line-height: 34px;
      }
    }
    .title-bg {
      img {
        position: absolute;
        top: -3px;
        left: 0;
        z-index: 2;
        width: 180px;
      }
    }
  }
  .title-bigger {
    position: absolute;
    top: -5px;
    z-index: 0;
    @include special-bg(210px, 50px, 10px, 14px);
    .title {
      &--front,
      &--front-duplicate,
      &--back {
        border-width: 2px;
      }
      &--front-duplicate {
        width: calc(100% - 4px);
        left: calc(14px / -2 + 2px);
      }
    }
  }
}
</style>
