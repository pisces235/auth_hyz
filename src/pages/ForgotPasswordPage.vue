<template>
  <div class="page-content relative-position">
    <img
      src="/images/small.png"
      class="width-32 height-32 back-btn"
      alt=""
      @click="redirectBtn()"
    />
    <TitleLoginPage title_page="Forgot Password" class="mt-10" />
    <Form
      :useAlertInfo="true"
      :titleAlertInfo="titleAlertInfo"
      :useAlertError="true"
      :titleAlertError="titleAlertError"
      :useMobileNumberInput="useMobileNumberInput"
      :useOTPInput="useOTPInput"
      :errorBorder_MB="errorBorder"
      :useBtn="true"
      :btnTitle="'Next'"
      :btnColor="colorBtn"
      :mt_150="true"
      :imgBtnWidthPercent="'100'"
      @input="getInput"
      @submit="submit"
      v-if="showForm"
    />

    <OTPLimitPage :titleAlertError="titleAlertError" v-else />
    {{ response }} <br />
    {{ data }}
  </div>
</template>

<script setup lang="ts">
import Form from '../components/form/FormComponent.vue'
import TitleLoginPage from '../components/auth-layouts/TitlePage.vue'
import OTPLimitPage from './OTPLimit.vue'

import { ref } from 'vue'
import { useAccountStore } from '../stores/account-store'
import { useRouter } from 'vue-router'
import { LocalStorage } from 'quasar'

const accountStore = useAccountStore()
const router = useRouter()

let countInputForgotPasswordWrong = ref(0)
if (
  typeof LocalStorage.getItem('countInputForgotPasswordWrong') === undefined
) {
  LocalStorage.set('countInputForgotPasswordWrong', 0)
} else {
  countInputForgotPasswordWrong.value = Number(
    LocalStorage.getItem('countInputForgotPasswordWrong')
  )
}
let data = ref()
let response = ref()
let useMobileNumberInput = ref(true)
let useOTPInput = ref(false)
let errorBorder = ref()
let colorBtn = ref('info')
let titleAlertInfo = ref('mobileNumber')
let titleAlertError = ref()
let showForm = ref(true)
// let mobileNumber = ref('')
// let OTP = ref('')

const redirectBtn = () => {
  if (showForm.value == true) router.go(-1)
  else {
    titleAlertError.value = ''
    showForm.value = true
  }
}

const getInput = (
  mobile_number: string,
  password: string,
  confirmPassword: string,
  otp: string
) => {
  if (mobile_number.length > 2 || otp.length > 0) {
    colorBtn.value = 'danger'
  } else colorBtn.value = 'info'
}

const submit = (
  mobile_number: string,
  password: string,
  confirmPassword: string,
  otp: string
) => {
  data.value = {
    mobile_number: mobile_number,
    code: otp,
    password: password
  }
  accountStore
    .accountForgetPassword(mobile_number, otp, password)
    .then((res) => {
      response.value = res.response
    })
    .catch((error) => {
      response.value = error.response.data
      colorBtn.value = 'info'

      if (response.value.message.search('Password') != -1) {
        accountStore.mobile_number = mobile_number
        accountStore.otp = otp
        router.push('/password/reset')
      }

      if (response.value.message.search('Invalid') != -1) {
        // if invalid mobile number
        errorBorder.value = true // toggle border
        titleAlertError.value = 'invalidMobileNumber'
        countInputForgotPasswordWrong.value += 1
        LocalStorage.set(
          'countInputForgotPasswordWrong',
          countInputForgotPasswordWrong.value
        )
      } else if (response.value.message.search('account registered') != -1) {
        //if input value not register yet
        errorBorder.value = true
        titleAlertError.value = 'wrongMobileNumber'
        countInputForgotPasswordWrong.value += 1
        LocalStorage.set(
          'countInputForgotPasswordWrong',
          countInputForgotPasswordWrong.value
        )
      } else if (response.value.message.search('otpRequired') != -1) {
        titleAlertError.value = ''
        titleAlertInfo.value = 'OTP'
        useMobileNumberInput.value = false
        useOTPInput.value = true
      } else if (response.value.data.failed > 0) {
        titleAlertInfo.value = 'OTP'
        useMobileNumberInput.value = false
        useOTPInput.value = true
        titleAlertError.value = 'OTPTryAgain'
      } else {
        if (otp != undefined) {
          titleAlertError.value = 'OTP'
        } else titleAlertError.value = ''
        showForm.value = false
      }
      if (countInputForgotPasswordWrong.value == 3) {
        LocalStorage.set('timeBlockBtn', 10)
      }
      if (countInputForgotPasswordWrong.value >= 5) {
        LocalStorage.set('timeBrowserBlock', 15)
        accountStore.titleAlertErrorBlockBrowserPage = 'blockAttempts'
        router.push('/browser/block')
      }
    })
}
</script>

<style lang="scss" scoped>
@import '../css/app.scss';

.page-content {
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
