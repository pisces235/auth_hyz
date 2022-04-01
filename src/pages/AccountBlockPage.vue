<template>
  <div class="contain-login height-viewport-100 mr-ss ml-ss" @load="checkLogin()">
    <div
      class="login-fail-content row justify-center z-1 width-percentage-100 relative-position"
      @show="restartFive()"
    >
      <div class="contain-title row justify-center relative-position width-percentage-100 ml-md">
        <div class="title-smaller">
          <div class="title">
            <div class="title--front"></div>
            <div
              class="title--front-duplicate f-size-md row justify-center relative-position"
            >
              <div class="dot dot-left w-fit-content"></div>
              <p>{{ title }}</p>
              <div class="dot dot-right w-fit-content"></div>
            </div>
            <div class="title--back"></div>
          </div>
          <div class="title-bg">
            <img src="../images/pattern.png" alt="" class="align-center" />
          </div>
        </div>
        <div class="title-bigger">
          <div class="title">
            <div class="title--front"></div>
            <div class="title--front-duplicate f-size-md"></div>
            <div class="title--back"></div>
          </div>
        </div>
      </div>
      <div class="icon-title width-percentage-100 mt-xxl row justify-center">
        <img class="big" src="../images/cross.png" />
      </div>
      <form
        class="width-percentage-100 row wrap justify-center relative-position mt-lg"
        action=""
      >
        <div class="form-field mb-sm">
          <div class="alert-danger">
            <div class="incorect-number row justify-center">
              <p
                class="f-size-sm mt-sm mb-sm text-center pb-xl"
              >
                Uh oh! Your account has been locked for security reasons after 5 failed login attempts.
              </p>
            </div>
          </div>
        </div>

        <div class="form-field contain-submit">
          <router-link to="/login">
            <button class="btn-submit mx-auto row enabled">
              <div class="title">
                <div class="title--front"></div>
                <div class="title--front-duplicate f-size-md">
                  Contact Sqkii
                </div>
                <div class="title--back"></div>
              </div></button
          ></router-link>

        </div>
        <div class="form-field">
          <hr class="mx-auto mb-sm mt-ss" />
          <div class="signup-contain text-center">
            <router-link to="/login" class="signup-link"
              ><span>Back to log in</span></router-link
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLayoutStore } from '../stores/layout-store';
import { useRouter } from 'vue-router';

const store = useLayoutStore();

const title = 'Browser Blocked!';
const router = useRouter();

const checkLogin = () => {
  if (store.countLoginFail < 5) {
    router.go(-1);
  }
};
let seconds = ref(0);
let minutes = ref(0);
let timer = ref(JSON.parse(window.localStorage.countDownFail));
let interval = setInterval(() => {
  if (timer.value === 0) {
    clearInterval(interval);
  } else {
    timer.value--;
    window.localStorage.countDownFail = JSON.stringify(timer.value);
    seconds.value = timer.value % 60;
    if(minutes.value > 0) {
      minutes.value = Math.round(timer.value / 60) - 1;
    }
    else {
      minutes.value = Math.round(timer.value / 60);
    }
  }
}, 1000);


</script>

<style lang="scss" scoped>
@import '../css/app.scss';

.contain-login {
  border-right: 1px solid $yellow;
  border-left: 1px solid $yellow;
  max-height: calc(100vh - 15px);
  .login-fail-content {
    .contain-title {
      .title-smaller {
        @include special-bg(180px, 40px, 8px, 14px);
        z-index: 1;
        position: relative;
        .title-bg {
          img {
            position: absolute;
            top: -3px;
            left: -10px;
            z-index: 2;
            width: 180px;
          }
        }
      }
      .title-bigger {
        position: absolute;
        top: -5px;
        z-index: 0;
        @include special-bg(190px, 50px, 10px, 14px);
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
    .icon-title {
      .big {
        width: 56px;
        height: 56px;
      }
    }
    .count-down {
      color: $brown;
    }
  }
}
</style>
