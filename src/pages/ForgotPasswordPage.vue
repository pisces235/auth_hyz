<template>
  <div class="page-content relative-position">
    <router-link to="/login" class="back-btn">
      <img src="../images/small.png" class="width-32 height-32" alt="" />
    </router-link>
    <TitleLoginPage title_page="Forgot Password" class="mt-10" />
    <Form
      class="mx-auto"
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
      :imgWidthPercent="'100'"
      @input="getInput"
      @submit="submit"
      v-show="showForm"
    />

    <OTPLimitPage v-show="showForm == false" />
    {{ data }}
  </div>
</template>

<script setup lang="ts">
import Form from '../components/form/FormComponent.vue'
import TitleLoginPage from '../components/auth-layouts/TitlePage.vue'
import OTPLimitPage from './OTPLimit.vue'

import { ref, watchEffect } from 'vue'
import { useAccountStore } from '../stores/account-store'
import { useRouter } from 'vue-router'
import { LocalStorage } from 'quasar'

const accountStore = useAccountStore()
const router = useRouter()

let countInputForgotPasswordWrong: any = ref(0)
if (
  typeof LocalStorage.getItem('countInputForgotPasswordWrong') === undefined
) {
  LocalStorage.set('countInputForgotPasswordWrong', 0)
} else {
  countInputForgotPasswordWrong.value = LocalStorage.getItem(
    'countInputForgotPasswordWrong'
  )
}
let data = ref()
let useMobileNumberInput = ref(true)
let useOTPInput = ref(false)
let errorBorder = ref()
let colorBtn = ref('info')
let titleAlertInfo = ref('mobileNumber')
let titleAlertError = ref()
let showForm = ref(true)
let mobileNumber = ref('')
let OTP = ref('')

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
  if (mobileNumber.value.length == 0) {
    mobileNumber.value = mobile_number
  } else {
    mobile_number = mobileNumber.value
  }
  OTP.value = otp
  accountStore
    .accountForgetPassword(mobile_number, otp.toString(), password)
    .then((response) => {
      data.value = response.response.data
    })
    .catch((error) => {
      data.value = error.response.data

  console.log(error.otp)
      colorBtn.value = 'info'
      if (data.value.message.search('Invalid') != -1) {
        // if invalid mobile number
        errorBorder.value = true // toggle border
        titleAlertError.value = 'invalidMobileNumber'
        countInputForgotPasswordWrong.value += 1
        LocalStorage.set(
          'countInputForgotPasswordWrong',
          countInputForgotPasswordWrong.value
        )
      } else if (data.value.message.search('account registered') != -1) {
        //if input value not register yet
        errorBorder.value = true
        titleAlertError.value = 'wrongMobileNumber'
        countInputForgotPasswordWrong.value += 1
        LocalStorage.set(
          'countInputForgotPasswordWrong',
          countInputForgotPasswordWrong.value
        )
      } else if (data.value.message.search('otp') != -1) {
          titleAlertInfo.value = 'OTP'
          useMobileNumberInput.value = false
          useOTPInput.value = true
      } else if (data.value.data.failed > 0) {
        titleAlertInfo.value = 'OTP'
        useMobileNumberInput.value = false
        useOTPInput.value = true
        titleAlertError.value = 'OTPTryAgain'
      } else if (data.value.data.info) {
        router.push('/account/block')
      } else {
        showForm = ref(false)
      }
      if (countInputForgotPasswordWrong.value == 3) {
        LocalStorage.set('timeBlockBtn', 10)
      }
      if (countInputForgotPasswordWrong.value >= 5) {
        LocalStorage.set('timeBrowserBlock', 15)
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
