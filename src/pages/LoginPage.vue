<template>
  <div class="contain-login height-viewport-100 mr-5 ml-5">
    <div
      class="login-content row justify-between z-1 width-percentage-100 relative-position mt-15"
    >
      <router-link to="/" class="back-btn">
        <img src="../images/small.png" class="width-32 height-32" alt="" />
      </router-link>
      <TitleLoginPage title_page="Login" class="absolute" />
      <FormPage
        :useTitle="true"
        :titleForm="'#HuntYourZodiac2022'"
        :useErrorAlert="true"
        :titleAlertError="titleAlertError"
        :useMobileNumberInput="true"
        :errorBorder_MB="errorBorder_MB"
        :usePasswordInput="true"
        :errorBorder_Password="errorBorder_Password"
        :useForgotLink="true"
        :useBtn="true"
        :useLoginBottom="true"
        :bottomText="'New to the game?'"
        :bottomLink="'/create-account'"
        :bottomLinkText="'Sign up here'"
        @submit="login"
        :mt_100="true"
      />
    </div>
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

let data = ref()
let errorBorder_MB = ref()
let errorBorder_Password = ref()
let titleAlertError = ref('')
let countInputWrong: any = ref(0)
if (typeof LocalStorage.getItem('countInputWrong') === undefined) {
  LocalStorage.set('countInputWrong', 0)
} else {
  countInputWrong.value = LocalStorage.getItem('countInputWrong')
}

function login(
  mb: { value: { toString: () => any } },
  pw: { value: { toString: () => any } }
) {
  console.log(mb, pw, countInputWrong.value)
  accountStore
    .accountLogin(mb, pw)
    .then((response) => {
      data.value = response.response.data
    })
    .catch((error) => {
      data.value = error.response.data
      if (data.value.message.search('Invalid') != -1) {
        errorBorder_MB.value = true
        titleAlertError.value = 'invalidMobileNumber'
        countInputWrong.value += 1

        LocalStorage.set('countInputWrong', countInputWrong.value)
      } else if (data.value.message.search('account registered') != -1) {
        errorBorder_MB.value = true
        errorBorder_Password.value = true
        titleAlertError.value = 'wrongMobileNumber'
        countInputWrong.value += 1
        LocalStorage.set('countInputWrong', countInputWrong.value)
      } else if (data.value.data.failed > 0) {
        errorBorder_MB.value = false
        errorBorder_Password.value = true
        if (data.value.data.failed === 3) {
          titleAlertError.value = '3timesWrong'
        } else if (data.value.data.failed === 4) {
          titleAlertError.value = '4timesWrong'
        } else titleAlertError.value = 'wrongPassword'
      } else {
        router.push('/account-block')
      }

      if (countInputWrong.value >= 5) {
        LocalStorage.set('timeBrowserBlock', 15)
        router.push('/login-block')
      }
    })

  //   // router.push('/');
}
</script>

<style lang="scss" scoped>
@import '../css/app.scss';

.contain-login {
  border-right: 1px solid $yellow;
  border-left: 1px solid $yellow;
  max-height: calc(100vh - 15px);
  .login-content {
    .absolute {
      top: -5px;
    }
    .back-btn {
      position: absolute;
      top: -5px;
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
}
</style>
