<template>
  <form
    id="form"
    class="width-percentage-100 row wrap justify-center relative-position mt-percentage-9"
    @submit.prevent="submit(), loadCover()"
  >
    <div
      class="form-title text-lg font-bold mt-20"
      v-show="props.titleForm != 'undefined' && props.useTitle == true"
      :class="{ 'mb-25': props.titleAlertError === '' }"
    >
      <p>{{ props.titleForm }}</p>
    </div>

    <AlertInfo
      v-show="props.useAlertInfo"
      :titleAlertInfo="props.titleAlertInfo"
    />

    <AlertError
      v-show="props.useAlertError"
      :titleAlertError="props.titleAlertError"
    />

    <div class="form-field" v-show="props.useMobileNumberInput">
      <input
        type="text"
        class="form-input form-input--text width-percentage-100"
        :class="{ 'border-danger': props.errorBorder_MB }"
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

    <div class="form-field mt-15 height-45" v-show="props.usePasswordInput">
      <input
        :type="input_type"
        class="form-input form-input--password width-percentage-100"
        :class="{
          'border-danger': props.errorBorder_Password || props.errorBorder_MB
        }"
        placeholder=" "
        v-model="password"
        @input="getInput()"
      />
      <label for="Password" class="form-label">{{ props.titlePasswordInput }}</label>
      <p class="form-btn--showpw" @click="changeType()">
        <q-icon name="mdi-eye-outline" />
      </p>
    </div>
    <div
      class="form-field mt-15 height-45"
      v-show="props.useConfirmPasswordInput"
    >
      <input
        :type="input_type"
        class="form-input form-input--password width-percentage-100"
        :class="{
          'border-danger':
            props.errorBorder_ConfirmPassword || props.errorBorder_Password
        }"
        placeholder=" "
        v-model="confirmPassword"
        @input="getInput()"
      />
      <label for="ConFirmPassword" class="form-label">Confirm Password</label>
      <p class="form-btn--showpw" @click="changeType()">
        <q-icon name="mdi-eye-outline" />
      </p>
    </div>

    <div class="form-field mt-15 height-45" v-show="props.useOTPInput">
      <input
        type="number"
        class="form-input form-input--password width-percentage-100"
        :class="{
          'border-danger': props.errorBorder_OTP
        }"
        placeholder=" "
        v-model="OTP"
        @input="getInput()"
      />
      <label for="OTP" class="form-label">OTP</label>
      <p class="form-btn--showpw" @click="changeType()">
        <q-icon name="mdi-eye-outline" />
      </p>
    </div>

    <div class="form-field mt-9 mb-24" v-show="props.useForgotLink">
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
      v-show="props.useLittleContent"
    >
      <p>{{ props.littleContent }}</p>
    </div>

    <ButtonForm
        :btnType="'submit'"
        :btnTitle="props.btnTitle"
        :btnColor="props.btnColor"
        class="mb-2 text-center width-percentage-100"
        :imgSrc="`/src/images/bg_btn_${props.btnColor}.png`"
        :imgWidth="props.imgWidth"
        :imgWidthPercent="props.imgWidthPercent"
        :imgHeight="props.imgHeight"
        v-show="props.useBtn"
      />

    <a
      :href="props.btnLink"
      v-show="props.useBtnLink"
      :class="{ 'mt-150': props.mt_150 }"
    >
      <ButtonForm
        :btnType="'submit'"
        :btnTitle="props.btnLinkTitle"
        :btnColor="props.btnLinkColor"
        class="mb-2 text-center width-percentage-100"
        :imgSrc="`/src/images/bg_btn_${props.btnLinkColor}.png`"
        :imgWidth="props.imgWidth"
        :imgWidthPercent="props.imgWidthPercent"
        :imgHeight="props.imgHeight"
      />
    </a>

    <div class="form-field" v-show="props.useLoginBottom">
      <hr class="mx-auto mb-10 mt-3" />
      <div class="signup-contain text-center">
        <div class="text">{{ props.bottomText }}</div>
        <router-link :to="props.bottomLink" class="signup-link"
          ><span>{{ props.bottomLinkText }}</span
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
// import { LocalStorage } from 'quasar'
import ButtonForm from './ButtonForm.vue'
import AlertInfo from './AlertInfo.vue'
import AlertError from './AlertError.vue'

let mobile_number = ref('')
let number = ref('')
let password = ref('')
let confirmPassword = ref('')
let OTP = ref('')
let firstNumber = ref('65')
let input_type = ref('password')
let showCover = ref(false)
let showBtnInfo = ref(true)
let showBtnError = ref(false)



const props = defineProps({
  titleForm: { value: { value: String, default: '' }, default: '' },
  useTitle: { useTitle: Boolean, default: false },

  useAlertInfo: { value: Boolean, default: false },
  titleAlertInfo: { value: String, default: '' },

  useAlertError: { value: Boolean, default: false },
  titleAlertError: { value: String, default: '' },

  useMobileNumberInput: { value: Boolean, default: false },
  errorBorder_MB: { value: Boolean, default: false },

  titlePasswordInput: { value: String, default: 'Password' },
  usePasswordInput: { value: Boolean, default: false },
  errorBorder_Password: { value: Boolean, default: false },

  useConfirmPasswordInput: { value: Boolean, default: false },
  errorBorder_ConfirmPassword: { value: Boolean, default: false },

  useOTPInput: { value: Boolean, default: false },
  errorBorder_OTP: { value: Boolean, default: false },

  useForgotLink: { value: Boolean, default: false },

  useLittleContent: { value: Boolean, default: false },
  littleContent: { value: String, default: '' },

  useBtn: { value: Boolean, default: false },
  btnTitle: { value: String, default: '' },
  btnColor: { value: String, default: '' },

  useBtnLink: { value: Boolean, default: false },
  btnLinkTitle: { value: String, default: '' },
  btnLinkColor: { value: String, default: '' },
  btnLink: { value: String, default: '' },

  imgBtnWidth: { value: String, default: null },
  imgBtnWidthPercent: { value: String, default: null },
  imgBtnHeight: { value: String, default: null },

  useLoginBottom: { value: Boolean, default: false },
  bottomText: { value: String, default: '' },
  bottomLink: { value: String, default: '' },
  bottomLinkText: { value: String, default: '' },

  mt_100: { value: Boolean, default: false },
  mt_150: { value: Boolean, default: false }
})
const emit = defineEmits(['submit', 'input'])
function submit() {
  emit('submit', mobile_number.value, password.value, confirmPassword.value, OTP.value)
}
function getInput() {
  emit('input', mobile_number.value, password.value, confirmPassword.value, OTP.value)
}
// const listFirstNumber = ['65', '84']

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
