<template>
  <div class="contain-login height-viewport-100 mr-ss ml-ss">
    <div
      class="login-fail-content row justify-center z-1 width-percentage-100 relative-position mt-10"
    >
      <TitleLoginPage :title_page="title" class="absolute" />

      <div class="icon-title width-percentage-100 mt-100 row justify-center">
        <img class="big" src="../images/cross.png" />
      </div>

      <div class="count-down text-4xl font-bold mt-25 mb-20">
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

      <ButtonForm
        :title_btn="'Back to log in'"
        :color_btn="'info'"
        class="mb-2 text-center w-100 mt-15"
        :src="'/src/images/bg_btn_info.png'"
        :width="'280'"
        :height="'44'"
        v-show="showBtnInfo"
      />
      <router-link to="/login" @click="resetCountInputWrong()">
        <ButtonForm
          :title_btn="'Back to log in'"
          :color_btn="'danger'"
          class="mb-2 text-center w-100 mt-15"
          :src="'/src/images/bg_btn_danger.png'"
          :width="'280'"
          :height="'44'"
          v-show="showBtnDanger"
        />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { LocalStorage } from 'quasar'

import TitleLoginPage from '../components/auth-layouts/TitlePage.vue'
import FormPage from '../components/form/FormComponent.vue'
import ButtonForm from '../components/form/ButtonForm.vue'

const title = 'Browser Blocked!'
const router = useRouter()
const countInputWrong = ref()
const checkLogin = () => {
  countInputWrong.value = LocalStorage.getItem('countInputWrong')
  if (countInputWrong.value < 5) {
    router.push('/login')
  }
}
const resetCountInputWrong = () => {
  LocalStorage.set('countInputWrong', 0)
}

checkLogin()

let showBtnInfo = ref(true)
let showBtnDanger = ref(false)
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
    if (Number(timer.value) >= 60) {
      if ((timer.value / 60) % 1 > 0.5)
        minutes.value = Math.round(timer.value / 60) - 1
      else minutes.value = Math.round(timer.value / 60)
      LocalStorage.set('minutes', minutes.value)
    } else {
      minutes.value = 0
      LocalStorage.set('minutes', minutes.value)
    }
  }
}, 1000)


watchEffect(() => {
  // toggle button
  if (timer.value == 0) {
    showBtnDanger.value = true
    showBtnInfo.value = false
  } else {
    showBtnDanger.value = false
    showBtnInfo.value = true
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
