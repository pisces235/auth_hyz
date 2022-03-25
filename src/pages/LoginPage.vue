<template>
  <div class="contain-login h-100 mr-ss ml-ss">
    <div class="login-content row justify-between z-1 w-100 relative-position">
      <router-link to="/" class="back-btn absolute-top">
        <div class="title">
          <div class="title--front"></div>
          <div class="title--front-duplicate f-size-md">
            <q-icon name="mdi-chevron-left" />
          </div>
          <div class="title--back"></div>
        </div>
      </router-link>
      <TitleLoginPage title_page="Login" />
      <form
        class="w-100 row wrap justify-center relative-position mt-xxl"
        action=""
      >
        <div
          class="form-title f-size-lg"
          :class="{
            'mb-sm': isNotMobileNumber | isNotPassword,
            'mb-xl': !isNotMobileNumber & !isNotPassword,
          }"
        >
          <p>#HuntYourZodiac2022</p>
        </div>

        <div
          class="form-field mb-lg"
          v-show="
            (isNotMobileNumber === true) &
            (loginStore.countDownBlock != 3) &
            (loginStore.countDownBlock != 2)
          "
        >
          <div class="alert-danger">
            <div class="incorect-number row">
              <img class="little mt-sm ml-sm mrsm" src="../images/cross.png" />
              <p class="f-size-sm mt-sm mb-sm">
                Hm... There isn’t an account registered with the number you’ve
                entered. Please check and try again!
              </p>
            </div>
          </div>
        </div>
        <div
          class="form-field mb-lg"
          v-show="
            (isNotPassword === true) &
            (isNotMobileNumber === false) &
            (loginStore.countDownBlock != 3) &
            (loginStore.countDownBlock != 2)
          "
        >
          <div class="alert-danger">
            <div class="incorect-number row">
              <img class="little mt-md ml-md mr-md" src="../images/cross.png" />
              <p class="f-size-sm mt-md mb-md">
                Hm... Looks like this isn’t the correct password. Please try
                again.
              </p>
            </div>
          </div>
        </div>

        <div class="form-field mb-lg" v-show="loginStore.countDownBlock == 3">
          <div class="alert-danger">
            <div class="incorect-number row">
              <img class="little mt-md ml-md mr-md" src="../images/cross.png" />
              <p class="f-size-sm mt-md mb-md">
                You’ve entered an incorrect password. You have
                <b>3 more attempts</b>
                before your account is locked. Tap “Forgot Password” if you’d
                like to reset it.
              </p>
            </div>
          </div>
        </div>
        <div class="form-field mb-xl" v-show="loginStore.countDownBlock == 2">
          <div class="alert-danger">
            <div class="incorect-number row">
              <img class="little mt-md ml-md mr-md" src="../images/cross.png" />
              <p class="f-size-sm mt-md mb-md">
                You’ve entered an incorrect password. You have
                <b>1 more attempts</b>
                before your account is locked. Tap “Forgot Password” if you’d
                like to reset it.
              </p>
            </div>
          </div>
        </div>
        <div class="form-field">
          <input
            type="text"
            class="form-input form-input--text w-100"
            :class="{ 'border-danger': isNotMobileNumber }"
            placeholder=" "
            v-model="number"
            @keypress="changeNumber()"
            maxlength="24"
          />
          <label for="mobile-number" class="form-label">Mobile Number</label>
          <select name="" id="" class="form-select" v-model="firstNumber">
            <option v-for="(text, i) in listFirstNumber" :key="i" :value="text">
              {{ text }}
            </option>
          </select>
        </div>

        <div class="form-field mt-md">
          <input
            :type="input_type"
            class="form-input form-input--password w-100"
            :class="{ 'border-danger': isNotPassword }"
            placeholder=" "
            v-model="password"
          />
          <label for="Password" class="form-label">Password</label>
          <p class="form-btn--showpw" @click="changeType()">
            <q-icon name="mdi-eye-outline" />
          </p>
        </div>
        <div class="form-field mt-md w-100">
          <router-link to="/forgot-password" class="forgot-link float-right"
            >Forgot Password?</router-link
          >
        </div>
        <div class="form-field mt-md contain-submit">
          <button
            class="btn-submit mx-auto row disabled"
            @click="login()"
            v-if="loginStore.countDownBlock == 3 && timer != 0"
            disabled
          >
            <div class="title">
              <div class="title--front"></div>
              <div class="title--front-duplicate f-size-md">
                Login ({{ timer }})
              </div>
              <div class="title--back"></div>
            </div>
          </button>
          <button class="btn-submit mx-auto row" @click="login()" v-else>
            <div class="title">
              <div class="title--front"></div>
              <div class="title--front-duplicate f-size-md">Log in</div>
              <div class="title--back"></div>
            </div>
          </button>
        </div>
        <div class="form-field">
          <hr class="mx-auto mb-sm mt-ss" />
          <div class="signup-contain text-auto">
            <div class="text">New to the game?</div>
            <router-link to="/" class="signup-link"
              ><span>Sign up here</span>.</router-link
            >
          </div>
        </div>
      </form>
    </div>
  </div>
  <div
    class="cover row justify-center"
    :class="{ 'd-none': isHide }"
    v-show="loginStore.countDownBlock == 2"
  >
    <div class="cover-bg h-100" @click="hideCover()"></div>
    <div class="cover-content mt-md">
      <div class="cover-alert row">
        <img
          class="little mt-md ml-md mr-md mb-md"
          src="../images/Smiley_profilepic 1.png"
          alt=""
        />
        <p class="f-size-sm mt-md mb-md w-fit-content">
          Uh oh... You seem to be having trouble with your password. Tap on
          “Forgot Password?” to reset it!
        </p>
        <div class="btn-cover text-auto w-100 pt-lg pb-lg" @click="hideCover()">
          Dismiss
        </div>
      </div>
      <div class="cover-forgot-pw pr-xl pl-xl pt-sm pb-md">
        <router-link to="/forgot-password" class="forgot-link float-right"
          >Forgot Password?</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLoginStore } from '../stores/login-store';
import { useAccountStore } from '../stores/account-store';
import { useRouter } from 'vue-router';
import TitleLoginPage from '../components/auth-layouts/TitlePage.vue';

window.localStorage.countDownLoginBtn = JSON.stringify(10);

const loginStore = useLoginStore();
const accountStore = useAccountStore();
const router = useRouter();

const listFirstNumber = ['+64', '+84'];

let mobile_number = ref('');
let number = ref('');
let password = ref('');
let firstNumber = ref('+64');
let input_type = ref('password');
let isNotMobileNumber = ref(false);
let isNotPassword = ref(false);
let isHide = ref(false);
let seconds = ref(0);
let minutes = ref(0);
let timer = ref(JSON.parse(window.localStorage.countDownLoginBtn));

const changeNumber = () => {
  number.value = number.value
    .replace(/[^\d]/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
};
const changeResult = () => {
  mobile_number.value =
    firstNumber.value + number.value.replace(/\s/g, '').trim();
};

const changeType = () => {
  if (input_type.value === 'password') input_type.value = 'text';
  else input_type.value = 'password';
};

const login = () => {
  loginStore.incrementCountLoginFail();
  isNotMobileNumber.value = false;
  isNotPassword.value = false;

  changeResult();
  if (loginStore.countDownBlock == 4) {
    window.localStorage.countDownLoginBtn = JSON.stringify(10);
    let interval = setInterval(() => {
      if (timer.value === 0) {
        clearInterval(interval);
      } else {
        timer.value--;
        window.localStorage.countDownLoginBtn = JSON.stringify(timer.value);
        seconds.value = timer.value % 60;
        if (minutes.value > 0) {
          minutes.value = Math.round(timer.value / 60) - 1;
        } else {
          minutes.value = Math.round(timer.value / 60);
        }
      }
    }, 1000);
  }

  if (mobile_number.value != accountStore.mobile_number) {
    isNotMobileNumber.value = true;
  }
  if (password.value != accountStore.password) {
    isNotPassword.value = true;
  }
  if (
    password.value != accountStore.password &&
    mobile_number.value == accountStore.mobile_number
  ) {
    loginStore.reductionCountDownBlock();
  }

  if (loginStore.countDownBlock <= 0) {
    router.push('/account-block');
  }

  if ((loginStore.countLoginFail % 5) == 0 || loginStore.countLoginFail == 5) {
    window.localStorage.countDownFail = JSON.stringify(15);
    router.push('/login-block');
  }
  if (isNotPassword.value === false && isNotMobileNumber.value === false) {
    loginStore.countLoginFail = 0;
    loginStore.countDownBlock = 6;
    router.push('/');
  }
};

const hideCover = () => {
  isHide.value = true;
};
</script>

<style lang="scss" scoped>
@import '../css/app.scss';

.contain-login {
  border-right: 1px solid $yellow;
  border-left: 1px solid $yellow;
  max-height: calc(100vh - 15px);
  .login-content {
    .back-btn {
      @include special-bg(32px, 32px, 8px, 8px);
      .title {
        &--front,
        &--front-duplicate,
        &--back {
          border-width: 2px;
          border-radius: 10px;
          background: $red;
          color: white;
        }
        &--front-duplicate {
          width: calc(100% - 4px);
          left: calc(14px / -2 + 5px);
          border: unset;
          line-height: 25px;
        }
      }
    }
    form {
      @include form;
      .btn-submit {
        background: transparent;
        outline: none;
        border: none;
        @include special-bg(280px, 45px, 10px, 14px);
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
  }
}
.cover {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  .cover-bg {
    background-color: black;
    opacity: 0.3;
    width: 100%;
    max-width: 600px;
  }
  .cover-content {
    position: fixed;
    top: 0;
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
        border-radius: 0 0 10px 10px;
        cursor: pointer;
      }
    }
    .cover-forgot-pw {
      position: fixed;
      top: 360px;
      right: 15px;
      width: fit-content;
      background: $nude;
      border-radius: 8px;
      a {
        color: $light-blue;
        display: block;
        width: 100%;
      }
    }
  }
}
@include responsive(sm) {
  .cover {
    .cover-bg {
    }
    .cover-content {
      position: absolute;
      left: auto;
      right: auto;
      .cover-forgot-pw {
        right: calc((100% - 600px) / 2 + 15px);
      }
    }
  }
}
</style>
