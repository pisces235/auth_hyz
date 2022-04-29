<template>
  <div class="signup-content relative-position">
    <router-link to="/" class="back-btn">
      <img src="/images/small.png" class="width-32 height-32" alt="" />
    </router-link>
    <TitleLoginPage title_page="Sign Up" class="mt-10" />
    <FormPage
      :useAlertInfo="true"
      :titleAlertInfo="titleAlertInfo"
      :useAlertError="true"
      :titleAlertError="titleAlertError"
      :useMobileNumberInput="true"
      :errorBorder_MB="errorBorder_MB"
      :useReferralCodeInput="true"
      :errorBorder_RC="errorBorder_RC"
      :useBtn="true"
      :btnTitle="'Next'"
      :btnColor="colorBtn"
      :imgBtnWidthPercent="'98'"
      :imgBtnHeight="'44'"
      :useLoginBottom="true"
      :bottomLink="'signup'"
      :bottomLinkText="'I don\'t have a Paylah! Account'"
      @input="getInput"
      @submit="signup"
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
let colorBtn = ref('info')
let data = ref()
let errorBorder_MB = ref()
let errorBorder_RC = ref()
let titleAlertInfo = ref('signup')
let titleAlertError = ref('')
let countInputSignupWrong: any = ref(0)

const getInput = (mobile_number: string) => {
  if (mobile_number.length > 2) {
    colorBtn.value = 'danger'
  } else colorBtn.value = 'info'
}

const signup = (
  mobile_number: string,
  password: string,
  confirmPassword: string,
  otp: string,
  RC: string
) => {
  accountStore
    .accountSignup(mobile_number, password, RC)
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
        countInputSignupWrong.value += 1
        LocalStorage.set('countInputSignupWrong', countInputSignupWrong.value)
      } else if (
        data.value.info == 'invalid_password' ||
        data.value.message.search('Password') != -1
      ) {
        accountStore.mobile_number = mobile_number
        router.push('/password/create-new')
      }
      if (countInputSignupWrong.value >= 5) {
        LocalStorage.set('timeBrowserBlock', 15)
        accountStore.titleAlertErrorBlockBrowserPage = 'blockLogin'
        router.push('/browser/block')
      }
    })
}
</script>

<style lang="scss" scoped>
@import '../css/app.scss';

.signup-content {
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
