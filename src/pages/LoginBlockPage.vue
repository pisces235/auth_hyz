<template>
  <div class="contain-login height-viewport-100 mr-ss ml-ss">
    <div
      class="login-fail-content row justify-center z-1 width-percentage-100 relative-position mt-10"
    >
      <TitleLoginPage title_page="Browser Blocked!" class="absolute" />

      <div class="icon-title width-percentage-100 mt-100 row justify-center">
        <img class="big" src="../images/cross.png" />
      </div>

      <div class="count-down text-4xl font-bold mt-25">
        <div>
          <span>0{{ minutes }}</span
          >:<span v-show="seconds >= 10">{{ seconds }}</span>
          <span v-show="seconds < 10">0{{ seconds }}</span>
        </div>
      </div>

      <FormPage
      :useErrorAlert="true"
      :titleAlertError="'blockBrowser'"
      :mt_100="false"
       />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useLayoutStore } from '../stores/layout-store'
import { useRouter } from 'vue-router'
import { LocalStorage } from 'quasar'

import TitleLoginPage from '../components/auth-layouts/TitlePage.vue'
import FormPage from '../components/form/indexForm.vue'

const store = useLayoutStore()

const title = 'Browser Blocked!'
const router = useRouter()
let seconds = ref(0)
let minutes = ref(0)
let timer = ref(LocalStorage.getItem('timeBrowserBlock'))
let interval = setInterval(() => {
  if (timer.value === 0) {
    clearInterval(interval)
  } else {
    timer.value = Number(timer.value) - 1
    LocalStorage.set('timeBrowserBlock', Number(timer.value))
    seconds.value = Number(timer.value) % 60
    LocalStorage.set('seconds', seconds.value)
    if (Number(timer.value) > 60) {
      minutes.value =
        Math.round((timer.value) / 60) - 1
      LocalStorage.set('minutes', minutes.value)
    } else {
      minutes.value = 0
      LocalStorage.set('minutes', minutes.value)
    }
  }
}, 1000)

// const checkLogin = () => {
//   if (LocalStorage.getItem('countInputWrong') < 5) {
//     router.push('/');
//   }
// };

</script>

<style lang="scss" scoped>
@import '../css/app.scss';

.contain-login {
  border-right: 1px solid $yellow;
  border-left: 1px solid $yellow;
  max-height: calc(100vh - 15px);
  .login-fail-content {
    .contain-title {

      .title-bigger {
        position: absolute;
        top: -5px;
        z-index: 0;
        @include special-bg(190px, 50px, 10px, 14px);
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
    form {
      @include form;

    }
    .icon-title {
      .big {
        width: 56px;
        height: 56px;
      }
    }
    .count-down {
      color: $brown;
    }
  }
}
</style>
