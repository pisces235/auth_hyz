<template>
  <div
    class="container row justify-center"
    :class="{ hide: LocalStorage.getItem('hideLayout') }"
  >
    <TopAuth
      class="relative-position z-0"
      v-show="!LocalStorage.getItem('hideLayout')"
    ></TopAuth>
    <div
      class="main height-viewport-100"
      :class="{ hide: LocalStorage.getItem('hideLayout') }"
    >
        <router-view></router-view>

    </div>
    <BottomAuth v-show="!LocalStorage.getItem('hideLayout')"></BottomAuth>
  </div>
</template>

<script setup lang="ts">
import TopAuth from '../components/auth-layouts/TopAuth.vue'
import BottomAuth from '../components/auth-layouts/BottomAuth.vue'
// import { ref, watchEffect } from 'vue'
import { LocalStorage } from 'quasar'

// let hideLayout = LocalStorage.getItem('hideLayout')
// console.log(hideLayout)
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
.hide {
  background: transparent !important;
  width: 100% !important;
}
</style>
