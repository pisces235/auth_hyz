<template>
  <div class="login-content relative-position">
    <router-link to="/" class="back-btn">
      <img src="../images/small.png" class="width-32 height-32" alt="" />
    </router-link>
    <TitleLoginPage title_page="Login" class="mt-10" />
    <FormPage
      :useTitle="true"
      :titleForm="'#HuntYourZodiac2022'"
      :useAlertError="true"
      :titleAlertError="titleAlertError"
      :useMobileNumberInput="true"
      :errorBorder_MB="errorBorder_MB"
      :usePasswordInput="true"
      :errorBorder_Password="errorBorder_Password"
      :useForgotLink="true"
      :useBtn="true"
      :btnTitle="'Log in'"
      :btnColor="colorBtn"
      :imgBtnWidthPercent="'98'"
      :imgBtnHeight="'44'"
      :useLoginBottom="true"
      :bottomText="'New to the game?'"
      :bottomLink="'/signup'"
      :bottomLinkText="'Sign up here'"
      @input="getInput"
      @submit="login"
    />
  </div>
</template>

<script setup lang="ts">
import TitleLoginPage from '../components/auth-layouts/TitlePage.vue'
import FormPage from '../components/form/FormComponent.vue'

import { ref } from 'vue'
import { useAccountStore } from '../stores/account-store'
import { useRouter } from 'vue-router'
import { LocalStorage } from 'quasar'

const accountStore = useAccountStore()
const router = useRouter()

// const listAlert = [
//   'wrongMobileNumber',
//   'wrongPassword',
//   '3timesWrong',
//   '4timesWrong'
// ]
let colorBtn = ref('info')
let data = ref()
let errorBorder_MB = ref()
let errorBorder_Password = ref()
let titleAlertError = ref('')
let countInputLoginWrong: any = ref(0)
if (typeof LocalStorage.getItem('countInputLoginWrong') === undefined) {
  LocalStorage.set('countInputLoginWrong', 0)
} else {
  countInputLoginWrong.value = LocalStorage.getItem('countInputLoginWrong')
}
const getInput = (mobile_number: string, password: string) => {
  if (mobile_number.length > 2 && password.length > 0) {
    colorBtn.value = 'danger'
  } else colorBtn.value = 'info'
}

function login(mobile_number: string, password: string) {
  accountStore
    .accountLogin(mobile_number, password)
    .then((response) => {
      data.value = response.response.data
    })
    .catch((error) => {
      data.value = error.response.data
      colorBtn.value = 'info'
      if (data.value.message.search('Invalid') != -1) {
        // if invalid mobile number
        errorBorder_MB.value = true // toggle border
        titleAlertError.value = 'invalidMobileNumber'
        countInputLoginWrong.value += 1
        LocalStorage.set('countInputLoginWrong', countInputLoginWrong.value)
      } else if (data.value.message.search('account registered') != -1) {
        //if input value not register yet
        errorBorder_MB.value = true
        errorBorder_Password.value = true
        titleAlertError.value = 'wrongMobileNumber'
        countInputLoginWrong.value += 1
        LocalStorage.set('countInputLoginWrong', countInputLoginWrong.value)
      } else if (data.value.data.failed > 0) {
        errorBorder_MB.value = false
        errorBorder_Password.value = true
        if (data.value.data.failed === 3) {
          titleAlertError.value = '3timesWrong'
        } else if (data.value.data.failed === 4) {
          titleAlertError.value = '4timesWrong'
        } else titleAlertError.value = 'wrongPassword'
      } else {
        router.push('/account/block')
      }
      if (countInputLoginWrong.value == 3) {
        LocalStorage.set('timeBlockBtn', 10)
      }
      if (countInputLoginWrong.value >= 5) {
        LocalStorage.set('timeBrowserBlock', 15)
        accountStore.titleAlertErrorBlockBrowserPage = 'blockLogin'
        router.push('/browser/block')
      }
    })
}
</script>

<style lang="scss" scoped>
@import '../css/app.scss';

.login-content {
  .back-btn {
    position: absolute;
    // top: -5px;
    left: -5px;
    z-index: 10;
    display: block !important;
    cursor: pointer;
  }
  .back-btn:hover,
  .back-btn:active {
    filter: drop-shadow(0 3px 2px #c4c4c4);
  }
}
</style>
