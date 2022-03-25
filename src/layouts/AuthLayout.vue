<template>
  <div class="container row justify-center">
    <TopAuth class="relative-position z-0"></TopAuth>
    <div class="main h-100">
      <div class="main-contain justify-center mt-md">
        <router-view></router-view>
      </div>
    </div>
    <BottomAuth></BottomAuth>
  </div>
</template>

<script setup lang="ts">
import TopAuth from '../components/auth-layouts/TopAuth.vue';
import BottomAuth from '../components/auth-layouts/BottomAuth.vue';
</script>

<style lang="scss" scoped>
@import '../css/app.scss';

.container {
  background: $gradient-blue;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  .main {
    background: $gradient-beige;
    width: calc(100% - 20px);
  }
}
</style>
