<template>
  <div class="page-content relative-position">
    <router-link to="/password/forget" class="back-btn">
      <img src="/images/small.png" class="width-32 height-32" alt="" />
    </router-link>
    <TitleLoginPage title_page="Create A Password" class="mt-10" />
    <Form
      :useAlertError="true"
      :titleAlertError="titleAlertError"
      :usePasswordInput="true"
      :useConfirmPasswordInput="true"
      :useBtn="true"
      :btnTitle="'Next'"
      :btnColor="btnColor"
      :errorBorder_Password="errorBorder_Password"
      :usePasswordCheck="true"
      @input="getInput"
      @submit="submit"
      @update="getUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useLayoutStore } from '../stores/layout-store'
import { useAccountStore } from '../stores/account-store'
import { useRouter } from 'vue-router'
import TitleLoginPage from '../components/auth-layouts/TitlePage.vue'
import Form from '../components/form/FormComponent.vue'

const accountStore = useAccountStore()
const router = useRouter()
// const check = (checkFuntion: any) => {
//   checkPass.value = checkFuntion()
// }

const otp = accountStore.otp
const mobileNumber = accountStore.mobile_number

if (mobileNumber.length == 0) {
  router.go(-1)
}

let titleAlertError = ref('')
let btnColor = ref('info')
let errorBorder_Password = ref(false)
let checkRules = ref(false)
let checkSameInput = ref(false)
let newPassword = ref('')
let confirmNewPassword = ref('')
let referralCode = ref()
let response = ref()

const getUpdate = (check: boolean) => {
  checkRules.value = check
}

const getInput = (
  mobile_number: string,
  password: string,
  confirmPassword: string,
  otp: string,
  rc: string
) => {
  newPassword.value = password
  confirmNewPassword.value = confirmPassword
  referralCode.value = rc
}
const submit = () => {
  accountStore
    .accountSignup(mobileNumber, newPassword.value, referralCode.value)
    .then((res) => {
      response.value = res.response
      router.push('/password/create-new/confirm')
    })
    .catch((error) => {
      response.value = error.response.data
    })
}

watchEffect(() => {
  if (confirmNewPassword.value.length > 0) {
    if (newPassword.value != confirmNewPassword.value) {
      titleAlertError.value = 'passwordNotMatch'

      errorBorder_Password.value = true
    } else {
      titleAlertError.value = ''
      checkSameInput.value = true
    }
  }
  if (
    confirmNewPassword.value.length == 0 ||
    confirmNewPassword.value == null
  ) {
    titleAlertError.value = ''
    errorBorder_Password.value = false
  }

  if (checkSameInput.value == true && checkRules.value == true) {
    errorBorder_Password.value = false
    btnColor.value = 'danger'
  }
})
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
