<template>
  <div class="contain-login h-100 mr-ss ml-ss">
    <div class="login-content row justify-between z-1 w-100 relative-position">
      <router-link to="/forgot-password" class="back-btn absolute-top">
        <div class="title">
          <div class="title--front"></div>
          <div class="title--front-duplicate f-size-md">
            <q-icon name="mdi-chevron-left" />
          </div>
          <div class="title--back"></div>
        </div>
      </router-link>
      <TitleLoginPage title_page="Set New Password" />
      <form
        class="w-100 row wrap justify-center relative-position mt-xxl"
        action=""
      >
      <div
          class="form-field mb-lg"
          v-show="
            (isNotTheSame === true)
          "
        >
          <div class="alert-danger pb-xl">
            <div class="incorect-number row  pb-xl">
              <img class="little mt-sm ml-sm mr-sm" src="../images/cross.png" />
              <p class="f-size-sm mt-sm mb-sm">
                Your passwords do not match.
              </p>
            </div>
          </div>
        </div>
        <div class="form-field mt-md">
          <input
            :type="input_type"
            class="form-input form-input--password w-100 f-size-sm"
            :class="{ 'border-danger': isNotTheSame }"
            placeholder=" "
            v-model="password"
            @keyup="checkPass()"
          />
          <label for="Password" class="form-label f-size-sm">NewPassword</label>
          <p class="form-btn--showpw" @click="changeType()">
            <q-icon name="mdi-eye-outline" />
          </p>
        </div>
        <div class="form-field mt-md">
          <input
            :type="input_type2"
            class="form-input form-input--password w-100 f-size-sm"
            :class="{ 'border-danger': isNotTheSame }"
            placeholder=" "
            v-model="confirm_password"
            @keyup="checkPass()"
          />
          <label for="Password" class="form-label f-size-sm"
            >Confirm New Password</label
          >
          <p class="form-btn--showpw" @click="changeType2()">
            <q-icon name="mdi-eye-outline" />
          </p>
        </div>

        <div class="form-field f-size-sm">
          <div class="check-pass mt-lg">
            <div class="text mt-ss mb-ss">
              In order to protect your account, make sure that your password
              contains:
            </div>
            <div
              class="min-length mt-ss mb-ss"
              :class="{ access: check_min_length }"
            >
              <q-icon
                name="mdi-checkbox-blank-circle-outline mb-ss"
                v-if="password.length == 0"
              />
              <img src="../images/cross.png" v-else-if="!check_min_length" />
              <img src="../images/tick.png" v-else />
              At least 8 characters
            </div>
            <div
              class="include-number mt-ss mb-ss"
              :class="{ access: include_number }"
            >
              <q-icon
                name="mdi-checkbox-blank-circle-outline mb-ss"
                v-if="password.length == 0"
              />
              <img src="../images/cross.png" v-else-if="!include_number" />
              <img src="../images/tick.png" v-else />
              At least 1 digit (0-9)
            </div>
            <div
              class="include-lowercase mt-ss mb-ss"
              :class="{ access: include_lower }"
            >
              <q-icon
                name="mdi-checkbox-blank-circle-outline mb-ss"
                v-if="password.length == 0"
              />
              <img src="../images/cross.png" v-else-if="!include_lower" />
              <img src="../images/tick.png" v-else />
              At least 1 lowercase (a-z)
            </div>
            <div
              class="include-uppercase mt-ss mb-ss"
              :class="{ access: include_upper }"
            >
              <q-icon
                name="mdi-checkbox-blank-circle-outline mb-ss"
                v-if="password.length == 0"
              />
              <img src="../images/cross.png" v-else-if="!include_upper" />
              <img src="../images/tick.png" v-else />
              At least 1 uppercase (A-Z)
            </div>
            <div
              class="include-special mt-ss mb-ss"
              :class="{ access: include_special }"
            >
              <q-icon
                name="mdi-checkbox-blank-circle-outline mb-ss"
                v-if="password.length == 0"
              />
              <img src="../images/cross.png" v-else-if="!include_special" />
              <img src="../images/tick.png" v-else />
              At least 1 special character
            </div>
          </div>
        </div>

        <div class="form-field mt-md contain-submit">
          <router-link to="/create-pass-confirm" v-if="isEnable">
            <button class="btn-submit mx-auto row enabled">
              <div class="title">
                <div class="title--front"></div>
                <div class="title--front-duplicate f-size-md">Next</div>
                <div class="title--back"></div>
              </div>
            </button>
          </router-link>
          <button class="btn-submit mx-auto row disabled" v-else disabled>
            <div class="title">
              <div class="title--front"></div>
              <div class="title--front-duplicate f-size-md">Next</div>
              <div class="title--back"></div>
            </div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLoginStore } from '../stores/login-store';
import { useAccountStore } from '../stores/account-store';
import { useRouter } from 'vue-router';
import TitleLoginPage from '../components/auth-layouts/TitlePage.vue';

const loginStore = useLoginStore();
const accountStore = useAccountStore();
const router = useRouter();

let password = ref('');
let confirm_password = ref('');
let input_type = ref('password');
let input_type2 = ref('password');

let check_min_length = ref(false);
let include_number = ref(false);
let include_lower = ref(false);
let include_upper = ref(false);
let include_special = ref(false);
let isEnable = ref(false);
let isNotTheSame = ref(false);

const checkPass = () => {
  if (password.value.length >= 8) {
    check_min_length.value = true;
  } else {
    check_min_length.value = false;
  }
  if (password.value.search(/[0-9]/g) != -1) {
    include_number.value = true;
  } else {
    include_number.value = false;
  }
  if (password.value.search(/[a-z]/g) != -1) {
    include_lower.value = true;
  } else {
    include_lower.value = false;
  }
  if (password.value.search(/[A-Z]/g) != -1) {
    include_upper.value = true;
  } else {
    include_upper.value = false;
  }
  if (password.value.search(/\W|_/g) != -1) {
    include_special.value = true;
  } else {
    include_special.value = false;
  }
  if (
    check_min_length.value == true &&
    include_number.value == true &&
    include_lower.value == true &&
    include_upper.value == true &&
    include_special.value == true &&
    password.value === confirm_password.value
  ) {
    isEnable.value = true;
    isNotTheSame.value = false;
  }
  else {
    isEnable.value = false;
    isNotTheSame.value = true;
  }
};

const changeType = () => {
  if (input_type.value === 'password') input_type.value = 'text';
  else input_type.value = 'password';
};
const changeType2 = () => {
  if (input_type2.value === 'password') input_type2.value = 'text';
  else input_type2.value = 'password';
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
</style>
