<template>
  <form
    id="form"
    class="width-percentage-100 row wrap justify-center relative-position mt-percentage-9"
    @submit.prevent="submit(), loadCover()"
  >
    <div
      class="form-title text-lg font-bold mt-20"
      v-show="titleForm != 'undefined' && useTitle == true"
      :class="{ 'mb-25': titleAlertError === '' }"
    >
      <p>{{ titleForm }}</p>
    </div>

    <AlertInfo v-show="useAlertInfo" :titleAlertInfo="titleAlertInfo" />

    <AlertError v-show="useAlertError" :titleAlertError="titleAlertError" />

    <div class="form-field" v-show="useMobileNumberInput">
      <input
        type="text"
        class="form-input form-input--text width-percentage-100"
        :class="{ 'border-danger': errorBorder_MB }"
        placeholder=" "
        v-model="number"
        :maxlength="9"
        @input="changeNumber(), changeResult(), getInput()"
      />
      <label for="mobile-number" class="form-label">Mobile Number</label>
      <div name="" id="" class="form-select fit-content">
        +{{ firstNumber }}
      </div>
    </div>

    <div class="form-field mt-10 mb-25" v-show="useReferralCodeInput">
      <div class="text-center text-red" @click="toggleRC()" v-if="!showRC">
        I have a #HYZ2022 referral code
      </div>
      <div v-else>
        <input
          type="text"
          class="form-input width-percentage-100"
          :class="{ 'border-danger': errorBorder_RC }"
          placeholder=" "
          v-model="referralCode"
          :maxlength="9"
          @input="getInput()"
        />
        <label for="mobile-number" class="form-label"
          >Referral Code (optional)</label
        >
      </div>
    </div>

    <div class="form-field mt-15 height-45" v-show="usePasswordInput">
      <input
        :type="input_type"
        class="form-input form-input--password width-percentage-100"
        :class="{
          'border-danger': errorBorder_Password || errorBorder_MB
        }"
        placeholder=" "
        v-model="password"
        @input="getInput()"
      />
      <label for="Password" class="form-label">{{ titlePasswordInput }}</label>
      <p class="form-btn--showpw" @click="changeType()">
        <q-icon name="mdi-eye-outline" />
      </p>
    </div>
    <div class="form-field mt-15 height-45" v-show="useConfirmPasswordInput">
      <input
        :type="input_type2"
        class="form-input form-input--password width-percentage-100"
        :class="{
          'border-danger': errorBorder_Password
        }"
        placeholder=" "
        v-model="confirmPassword"
        @input="getInput()"
      />
      <label for="ConFirmPassword" class="form-label">Confirm Password</label>
      <p class="form-btn--showpw" @click="changeType2()">
        <q-icon name="mdi-eye-outline" />
      </p>
    </div>

    <div class="form-field mt-15 height-45" v-show="useOTPInput">
      <input
        type="text"
        maxlength="6"
        class="form-input form-input--password width-percentage-100"
        :class="{
          'border-danger': errorBorder_OTP
        }"
        placeholder=" "
        v-model="OTP"
        @input="getInput(), changeOTP()"
      />
      <label for="OTP" class="form-label">OTP</label>
      <p class="form-btn--showpw" @click="changeType()">
        <q-icon name="mdi-eye-outline" />
      </p>
    </div>

    <PasswordCheck
      :password="password"
      @update="checkBtn"
      v-show="usePasswordCheck"
      class="mb-15"
    />

    <div class="form-field mt-9 mb-24" v-show="useForgotLink">
      <router-link to="/password/forget" class="forgot-link float-right"
        >Forgot Password?</router-link
      >
      <div class="cover-forgot-pw" :class="{ 'd-none': !showCover }">
        <router-link to="/password/forget" class="forgot-link float-right"
          >Forgot Password?</router-link
        >
      </div>
    </div>

    <div
      class="little-content mt-20 mb-10 text-center"
      v-show="useLittleContent"
    >
      <p>{{ littleContent }}</p>
    </div>

    <ButtonForm
      btnType="submit"
      :btnTitle="btnTitle"
      :btnColor="btnColor"
      class="mb-2 text-center width-percentage-100"
      :imgSrc="`/images/bg_btn_${btnColor}.png`"
      :imgBtnWidth="imgBtnWidth"
      :imgBtnWidthPercent="imgBtnWidthPercent"
      :imgBtnHeight="imgBtnHeight"
      v-if="useBtn"
      :class="{ 'mt-150': mt_150 }"
    />

    <a
      :href="btnLink"
      v-show="useBtnLink && btnLinkColor"
      :class="{ 'mt-150': mt_150 }"
    >
      <ButtonForm
        btnType="submit"
        :btnTitle="btnLinkTitle"
        :btnColor="btnLinkColor"
        class="mb-2 text-center width-percentage-100"
        :imgSrc="`/images/bg_btn_${btnLinkColor}.png`"
        :imgBtnWidth="imgBtnWidth"
        :imgBtnWidthPercent="imgBtnWidthPercent"
        :imgBtnHeight="imgBtnHeight"
      />
    </a>

    <div class="form-field" v-show="useLoginBottom">
      <hr class="mx-auto mb-10 mt-3" />
      <div class="signup-contain text-center">
        <div class="text">{{ bottomText }}</div>
        <router-link :to="bottomLink" class="signup-link"
          ><span>{{ bottomLinkText }}</span
          >.</router-link
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
          src="/images/Smiley_profilepic 1.png"
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
// import { LocalStorage } from 'quasar'
import ButtonForm from './ButtonForm.vue'
import AlertInfo from './AlertInfo.vue'
import AlertError from './AlertError.vue'
import rules from '../../boot/rules'
import PasswordCheck from './PasswordCheck.vue'

let mobile_number = ref('')
let number = ref('')
let password = ref('')
let confirmPassword = ref('')
let OTP = ref()
let referralCode = ref()
let firstNumber = ref('65')
let showCover = ref(false)
let showBtnInfo = ref(true)
let showBtnError = ref(false)
let input_type = ref('password')
let input_type2 = ref('password')
let showRC = ref(false)

let checkRules = ref(false)

interface Props {
  useTitle?: boolean
  titleForm?: string

  useAlertError?: boolean
  titleAlertError?: string

  useAlertInfo?: boolean
  titleAlertInfo?: string

  useMobileNumberInput?: boolean
  errorBorder_MB?: boolean

  useReferralCodeInput?: boolean
  errorBorder_RC?: boolean

  usePasswordInput?: boolean
  titlePasswordInput?: string
  errorBorder_Password?: boolean

  useConfirmPasswordInput?: boolean

  useOTPInput?: boolean
  errorBorder_OTP?: boolean

  usePasswordCheck?: boolean

  useForgotLink?: boolean

  useLittleContent?: boolean
  littleContent?: string

  useBtn?: boolean
  btnTitle?: string
  btnColor?: string

  useBtnLink?: boolean
  btnLinkTitle?: string
  btnLinkColor?: string
  btnLink?: string

  imgBtnWidth?: string
  imgBtnWidthPercent?: string
  imgBtnHeight?: string

  useLoginBottom?: boolean
  bottomText?: string
  bottomLink?: string
  bottomLinkText?: string

  mt_100?: boolean
  mt_150?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  titleForm: '',
  useTitle: false,

  useAlertInfo: false,
  titleAlertInfo: '',

  useAlertError: false,
  titleAlertError: '',

  useMobileNumberInput: false,
  errorBorder_MB: false,

  useReferralCodeInput: false,
  errorBorder_RC: false,

  titlePasswordInput: 'Password',
  usePasswordInput: false,
  errorBorder_Password: false,

  useConfirmPasswordInput: false,

  useOTPInput: false,
  errorBorder_OTP: false,

  usePasswordCheck: false,

  useForgotLink: false,

  useLittleContent: false,
  littleContent: '',

  useBtn: false,
  btnTitle: '',
  btnColor: 'info',

  useBtnLink: false,
  btnLinkTitle: '',
  btnLinkColor: 'info',
  btnLink: '',

  imgBtnWidth: '',
  imgBtnWidthPercent: '',
  imgBtnHeight: '',

  useLoginBottom: false,
  bottomText: '',
  bottomLink: '',
  bottomLinkText: '',

  mt_100: false,
  mt_150: false
})
const emit = defineEmits(['submit', 'input', 'update'])
function submit() {
  emit(
    'submit',
    mobile_number.value,
    password.value,
    confirmPassword.value,
    OTP.value,
    referralCode.value
  )
}
function getInput() {
  emit(
    'input',
    mobile_number.value,
    password.value,
    confirmPassword.value,
    OTP.value,
    referralCode.value
  )
}
function getUpdate() {
  emit('update', checkRules.value)
}
// const listFirstNumber = ['65', '84']
const toggleRC = () => {
  showRC.value = !showRC.value
}

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
const changeType2 = () => {
  if (input_type2.value === 'password') input_type2.value = 'text'
  else input_type2.value = 'password'
}
const changeOTP = () => {
  OTP.value = rules.maskNumber(OTP.value)
}

function loadCover() {
  if (props.titleAlertError == '3timesWrong') {
    showCover.value = true
  } else showCover.value = false
}
const hideCover = () => {
  showCover.value = false
}
const checkBtn = (isCheck: boolean) => {
  checkRules.value = isCheck
}
watchEffect(() => {
  // toggle button login
  if (
    number.value.length > 0 &&
    password.value.length > 0 &&
    number.value !== ' ' &&
    password.value !== ' '
  ) {
    showBtnError.value = true
    showBtnInfo.value = false
  } else {
    showBtnError.value = false
    showBtnInfo.value = true
  }

  getUpdate()
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
