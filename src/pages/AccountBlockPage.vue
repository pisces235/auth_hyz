<template>
  <div class="contain-login height-viewport-100 mr-ss ml-ss">
    <div
      class="login-fail-content row justify-center z-1 width-percentage-100 relative-position"
    >
      <TitleLoginPage :title_page="title" class="mt-10" />
      <div class="icon-title width-percentage-100 mt-100 row justify-center mb-15">
        <img class="big" src="../images/cross.png" />
      </div>

      <FormPage
        :useErrorAlert="true"
        :titleAlertError="titleAlertError"
        :useBtn="true"
        :useLoginBottom="true"
        :useLittleContent="true"
        :littleContent="littleContent"
        :bottomText="'New to the game?'"
        :bottomLink="'/create-account'"
        :bottomLinkText="'Sign up here'"
        :mt_100="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLayoutStore } from '../stores/layout-store';
import { useRouter } from 'vue-router';

import TitleLoginPage from '../components/auth-layouts/TitlePage.vue'
import FormPage from '../components/form/FormComponent.vue'

const store = useLayoutStore();

const title = 'Account Blocked!';
const router = useRouter();
const titleAlertError = 'blockAccount'
const littleContent ='Please contact Sqkii on Facebook for assistance'


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
      .alert-danger{
        p {
          width: 100% !important;  
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
