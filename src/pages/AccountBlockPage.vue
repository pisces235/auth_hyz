<template>
  <div class="account-block height-viewport-100 mr-ss ml-ss">
    <TitleLoginPage :title_page="title" class="mt-10" />
    <div
      class="icon-title width-percentage-100 mt-100 row justify-center mb-15"
    >
      <img class="big" src="/images/cross.png" />
    </div>

    <FormPage
      :useErrorAlert="true"
      :titleAlertError="titleAlertError"
      :useLoginBottom="true"
      :useLittleContent="true"
      :littleContent="littleContent"
      :useBtnLink="true"
      :btnLinkTitle="BtnLinkTitle"
      :btnLinkColor="'danger'"
      :btnLink="'https://fb.com'"
      :bottomLink="'/login'"
      :bottomLinkText="'Back to log in'"
      :mt_100="false"
    />
  </div>
</template>

<script setup lang="ts">
import TitleLoginPage from '../components/auth-layouts/TitlePage.vue'
import FormPage from '../components/form/FormComponent.vue'

const title = 'Account Blocked!'
const titleAlertError = 'blockAccount'
const littleContent = 'Please contact Sqkii on Facebook for assistance'
const BtnLinkTitle = 'Contact Sqkii'
</script>

<style lang="scss" scoped>
@import '../css/app.scss';

.account-block {
  border-right: 1px solid $yellow;
  border-left: 1px solid $yellow;
  max-height: calc(100vh - 15px);
  .form-field {
    .alert-danger {
      left: 0 !important;
      p {
        width: 100% !important;
      }
    }
  }
}
</style>
