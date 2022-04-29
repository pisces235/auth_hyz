<template>
  <div class="contain-login height-viewport-100 mr-ss ml-ss">
    <div
      class="login-fail-content row justify-center z-1 width-percentage-100 relative-position mt-10"
    >
      <TitleLoginPage :title_page="title" class="absolute" />

      <div class="icon-title width-percentage-100 mt-100 row justify-center">
        <img class="big" src="/images/cross.png" />
      </div>

      <div class="count-down text-4xl font-bold mt-25 mb-20">
        <div>
          <span>0{{ minutes }}</span
          >:<span v-show="seconds >= 10">{{ seconds }}</span>
          <span v-show="seconds < 10">0{{ seconds }}</span>
        </div>
      </div>

      <FormPage
        :useAlertError="true"
        :titleAlertError="titleAlertError"
        :useBtn="true"
        :btnTitle="btnTitle"
        :btnColor="btnColor"
        :mt_100="false"
        @submit="resetcountInputWrong()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { LocalStorage } from 'quasar'
import { useAccountStore } from '../stores/account-store'

import TitleLoginPage from '../components/auth-layouts/TitlePage.vue'
import FormPage from '../components/form/FormComponent.vue'
import ButtonForm from '../components/form/ButtonForm.vue'

const title = 'Browser Blocked!'
const router = useRouter()
const btnTitle = 'Back to log in'
const accountStore = useAccountStore()

let btnColor = ref('info')
let titleAlertError = accountStore.titleAlertErrorBlockBrowserPage

const countInputLoginWrong = ref()
// const checkLogin = () => {
//   countInputLoginWrong.value = LocalStorage.getItem('countInputLoginWrong')
//   if (countInputLoginWrong.value < 5) {
//     router.push('/login')
//   }
// }
const resetcountInputWrong = () => {
  if (Number(LocalStorage.getItem('countInputLoginWrong')) > 0) {
    LocalStorage.set('countInputLoginWrong', 0)
  }
  if (Number(LocalStorage.getItem('countInputForgotPasswordWrong')) > 0) {
    LocalStorage.set('countInputForgotPasswordWrong', 0)
  }
  router.push('/login')
}

// checkLogin()

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
    if (Number(timer.value) >= 60) {
      if ((timer.value / 60) % 1 > 0.5)
        minutes.value = Math.round(timer.value / 60) - 1
      else minutes.value = Math.round(timer.value / 60)
    } else {
      minutes.value = 0
    }
  }
}, 1000)

watchEffect(() => {
  // toggle button
  if (timer.value == 0) {
    btnColor.value = 'danger'
  } else {
    btnColor.value = 'info'
  }
})
</script>

<style lang="scss" scoped>
@import '../css/app.scss';

.contain-login {
  border-right: 1px solid $yellow;
  border-left: 1px solid $yellow;
  max-height: calc(100vh - 15px);
  .login-fail-content {
    @include form;
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
