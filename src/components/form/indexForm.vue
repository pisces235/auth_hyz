<template>
  <form
    id="form"
    class="width-percentage-100 row wrap justify-center relative-position "
    :class="{'mt-100' : props.mt_100 }"
    @submit.prevent="submit(), loadCover()"
  >
    <div
      class="form-title text-lg font-bold mb-25"
      v-show="props.titleForm != 'undefined' && props.useTitle == true"
    >
      <p>{{ props.titleForm }}</p>
    </div>

    <div class="contain-alert width-percentage-100" v-show="props.useErrorAlert">
      <div
        class="form-field mb-20"
        v-show="props.titleAlertError == 'wrongMobileNumber'"
      >
        <div class="alert-danger">
          <div class="incorect-number row">
            <img
              class="little mt-10 ml-10 mr-10"
              src="../../images/cross.png"
            />
            <p class="text-xs mt-10 mb-10">
              Hm... There isn’t an account registered with the number you’ve
              entered. Please check and try again!
            </p>
          </div>
        </div>
      </div>
      <div
        class="form-field mb-20"
        v-show="props.titleAlertError == 'invalidMobileNumber'"
      >
        <div class="alert-danger">
          <div class="incorect-number row">
            <img
              class="little mt-10 ml-10 mr-10"
              src="../../images/cross.png"
            />
            <p class="text-xs mt-10 mb-10">
              Hm... First number input must be 8 or 9 and Mobile Number at least eight characters, please try again!
            </p>
          </div>
        </div>
      </div>
      <div
        class="form-field mb-20"
        v-show="props.titleAlertError == 'wrongPassword'"
      >
        <div class="alert-danger">
          <div class="incorect-number row">
            <img
              class="little mt-10 ml-10 mr-10"
              src="../../images/cross.png"
            />
            <p class="text-xs mt-10 mb-10">
              Hm... Looks like this isn’t the correct password. Please try
              again.
            </p>
          </div>
        </div>
      </div>
      <div
        class="form-field mb-20"
        v-show="props.titleAlertError == '3timesWrong'"
      >
        <div class="alert-danger">
          <div class="incorect-number row">
            <img
              class="little mt-10 ml-10 mr-10"
              src="../../images/cross.png"
            />
            <p class="text-xs mt-10 mb-10">
              You’ve entered an incorrect password. You have
              <b>2 more attempts</b>
              before your account is locked. Tap “Forgot Password” if you’d like
              to reset it.
            </p>
          </div>
        </div>
      </div>
      <div
        class="form-field mb-20"
        v-show="props.titleAlertError == '4timesWrong'"
      >
        <div class="alert-danger">
          <div class="incorect-number row">
            <img
              class="little mt-10 ml-10 mr-10"
              src="../../images/cross.png"
            />
            <p class="text-xs mt-10 mb-10">
              You’ve entered an incorrect password. You have
              <b>1 more attempts</b>
              before your account is locked. Tap “Forgot Password” if you’d like
              to reset it.
            </p>
          </div>
        </div>
      </div>
      <div
        class="form-field mb-10"
        v-show="props.titleAlertError == 'blockBrowser'"
      >
        <div class="alert-danger">
          <div class="incorect-number row justify-center">
            <p
              class="text-xs mt-10 mb-10 text-center"
              v-if="Number(LocalStorage.getItem('timeBrowserBlock')) > 0"
            >
              Uh oh! You have attempted too many incorrect log ins. Please try
              again after 5 mins.
            </p>
            <p class="text-xs mt-10 mb-10 text-center expand-w" v-else>
              Uh oh! You have attempted too many incorrect log ins. Please try
              again after 5 mins.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="form-field" v-show="props.useMobileNumberInput">
      <input
        type="text"
        class="form-input form-input--text width-percentage-100"
        :class="{ 'border-danger': props.errorBorder_MB }"
        placeholder=" "
        v-model="number"
        :maxlength="9"
        @input="changeNumber(), changeResult()"
      />
      <label for="mobile-number" class="form-label">Mobile Number</label>
      <select name="" id="" class="form-select" v-model="firstNumber">
        <option v-for="(text, i) in listFirstNumber" :key="i" :value="text">
          +{{ text }}
        </option>
      </select>
    </div>

    <div class="form-field mt-15 height-45" v-show="props.usePasswordInput">
      <input
        :type="input_type"
        class="form-input form-input--password width-percentage-100"
        :class="{
          'border-danger': props.errorBorder_Password || props.errorBorder_MB
        }"
        placeholder=" "
        v-model="password"
      />
      <label for="Password" class="form-label">Password</label>
      <p class="form-btn--showpw" @click="changeType()">
        <q-icon name="mdi-eye-outline" />
      </p>
    </div>
    <div class="form-field mt-9 mb-24 width-percentage-100" v-show="props.useForgotLink">
      <router-link to="/forgot-password" class="forgot-link float-right"
        >Forgot Password?</router-link
      >
      <div class="cover-forgot-pw" :class="{ 'd-none': !showCover }">
        <router-link to="/forgot-password" class="forgot-link float-right"
          >Forgot Password?</router-link
        >
      </div>
    </div>
    <ButtonForm
      :title_btn="'Log in'"
      :color_btn="'info'"
      class="mb-2 text-center w-100"
      :src="'/src/images/bg_btn_info.png'"
      :width="'280'"
      :height="'44'"
      v-show="showBtnInfo && props.useBtnLogin"
    />
    <ButtonForm
      :title_btn="'Log in'"
      :color_btn="'danger'"
      class="mb-2 text-center w-100"
      :src="'/src/images/bg_btn_danger.png'"
      :width="'280'"
      :height="'44'"
      v-show="showBtnDanger && props.useBtnLogin"
    />

    <div class="form-field" v-show="props.useLoginBottom">
      <hr class="mx-auto mb-10 mt-5" />
      <div class="signup-contain text-center">
        <div class="text">New to the game?</div>
        <router-link to="/" class="signup-link"
          ><span>Sign up here</span>.</router-link
        >
      </div>
    </div>
  </form>
  <div class="cover row justify-center" :class="{ 'd-none': !showCover }">
    <div class="cover-bg height-viewport-100" @click="hideCover()"></div>
    <div class="cover-content mt-15">
      <div class="cover-alert row">
        <img
          class="little mt-15 ml-15 mr-15 mb-15"
          src="../../images/Smiley_profilepic 1.png"
          alt=""
        />
        <p class="text-sm mt-15 mb-15 w-fit-content">
          Uh oh... You seem to be having trouble with your password. Tap on
          “Forgot Password?” to reset it!
        </p>
        <div
          class="btn-cover text-center width-percentage-100 pt-17 pb-17"
          @click="hideCover()"
        >
          Dismiss
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
// import { computed } from '@vue/reactivity'
// import { useAccountStore } from '../../stores/account-store'
// import { useRouter } from 'vue-router'
import { LocalStorage } from 'quasar'
import ButtonForm from './buttonFrom.vue'

let mobile_number = ref('')
let number = ref('')
let password = ref('')
let firstNumber = ref('65')
let input_type = ref('password')
let showCover = ref()
let showBtnInfo = ref(true)
let showBtnDanger = ref(false)

// let seconds = ref(0)
// let minutes = ref(0)

// let timer = ref(JSON.parse(window.localStorage.countDownLoginBtn))
LocalStorage.set('timeBLockBtn', 10) // set time block button in 10 second

const props = defineProps({
  titleForm: String,
  useTitle: Boolean,

  useErrorAlert:Boolean,
  titleAlertError: String,


  useMobileNumberInput: Boolean,
  errorBorder_MB: Boolean,

  usePasswordInput: Boolean,
  errorBorder_Password: Boolean,

  useForgotLink: Boolean,

  useBtnLogin: Boolean,

  useBtnBlock: Boolean,

  useLoginBottom: Boolean,

  mt_100: Boolean,
})
const emit = defineEmits(['submit'])
function submit() {
  emit('submit', mobile_number.value, password.value)
}
const listFirstNumber = ['65', '84']

const changeNumber = () => {
  if (number.value.length > 8 && number.value.search(' ') == -1) {
    number.value = number.value.slice(0, 8)
  }
  number.value = number.value
    .replace(/[^\d]/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim()
}
const changeResult = () => {
  mobile_number.value =
    firstNumber.value + number.value.replace(/\s/g, '').trim()
}

const changeType = () => {
  if (input_type.value === 'password') input_type.value = 'text'
  else input_type.value = 'password'
}

function loadCover() {
  if (props.titleAlertError == '3timesWrong') {
    showCover.value = true
  } else showCover.value = false
}

const hideCover = () => {
  showCover.value = false
}
watchEffect( () => {
  // toggle button
  if (
    number.value.length > 0 &&
    password.value.length > 0 &&
    number.value !== ' ' &&
    password.value !== ' '
  ) {
    showBtnDanger.value  = true
    showBtnInfo.value = false
  }
  else{
    showBtnDanger.value  = false
    showBtnInfo.value = true
  }
})
</script>

<style lang="scss" scoped>
@import '../../css/app.scss';

form {
  @include form;
  .w-100 {
    width: 100% !important;
  }
  .cover-forgot-pw {
    position: absolute;
    width: fit-content;
    background: $nude;
    top: -7px;
    right: -17px;
    border-radius: 8px;
    z-index: 100;
    a {
      color: $light-blue;
      display: inline-block;
      width: 100%;
      padding: 7px 20px 13px 20px;
    }
  }
}

.cover {
  position: fixed;
  top: 0px;
  left: 0;
  z-index: 10;
  width: 100%;
  .cover-bg {
    background-color: black;
    opacity: 0.3;
    width: calc(100% + 30px);
    max-width: 600px;
  }
  .cover-content {
    position: fixed;
    top: -5px;
    left: 10px;
    width: calc(100% - 20px);
    max-width: 580px;
    .cover-alert {
      color: black;
      font-weight: 400;
      background: $gradient-pink;
      border-radius: 10px;
      .little {
        width: 40px;
        height: 40px;
      }

      p {
        width: calc(100% - 70px);
        text-align: left;
      }
      .btn-cover {
        background-color: $nude;
        color: $light-blue;
        border-radius: 0 0 7px 7px;
        cursor: pointer;
      }
    }
  }
}
@include responsive(sm) {
  form {
  }
  .cover {
    .cover-content {
      position: absolute;
      left: auto;
      right: auto;
    }
  }
}
</style>
