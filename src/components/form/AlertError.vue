<template>
  <div class="alert--error width-percentage-100">
    <div
      class="alert-danger mx-auto mb-15 mt-5"
      v-show="props.titleAlertError == 'wrongMobileNumber'"
    >
      <div class="row">
        <img class="little mt-10 ml-10 mr-10" src="../../images/cross.png" />
        <p class="text-xs mt-10 mb-10">
          Hm... There isn’t an account registered with the number you’ve
          entered. Please check and try again!
        </p>
      </div>
    </div>
    <div
      class="alert-danger mx-auto mb-15 mt-5"
      v-show="props.titleAlertError == 'invalidMobileNumber'"
    >
      <div class="row">
        <img class="little mt-10 ml-10 mr-10" src="../../images/cross.png" />
        <p class="text-xs mt-10 mb-10">
          Hm... First number input must be 8 or 9 and Mobile Number at least
          eight characters, please try again!
        </p>
      </div>
    </div>
    <div
      class="alert-danger mx-auto mb-15 mt-5"
      v-show="props.titleAlertError == 'wrongPassword'"
    >
      <div class="row">
        <img class="little mt-10 ml-10 mr-10" src="../../images/cross.png" />
        <p class="text-xs mt-10 mb-10">
          Hm... Looks like this isn’t the correct password. Please try again.
        </p>
      </div>
    </div>
    <div
      class="alert-danger mx-auto mb-15 mt-5"
      v-show="props.titleAlertError == '3timesWrong'"
    >
      <div class="row">
        <img class="little mt-10 ml-10 mr-10" src="../../images/cross.png" />
        <p class="text-xs mt-10 mb-10">
          You’ve entered an incorrect password. You have
          <b>2 more attempts</b>
          before your account is locked. Tap “Forgot Password” if you’d like to
          reset it.
        </p>
      </div>
    </div>
    <div
      class="alert-danger mx-auto mb-15 mt-5"
      v-show="props.titleAlertError == '4timesWrong'"
    >
      <div class="row">
        <img class="little mt-10 ml-10 mr-10" src="../../images/cross.png" />
        <p class="text-xs mt-10 mb-10">
          You’ve entered an incorrect password. You have
          <b>1 more attempts</b>
          before your account is locked. Tap “Forgot Password” if you’d like to
          reset it.
        </p>
      </div>
    </div>
    <div
      class="alert-danger mx-auto mb-15 mt-5"
      v-show="props.titleAlertError == 'blockBrowser'"
    >
        <p class="text-xs mt-10 mb-10 pl-5 pr-5 text-center width-percentage-100">
          Uh oh! You have attempted too many incorrect log ins. Please try again
          after 5 mins.
        </p>
    </div>
    <div
      class="alert-danger mx-auto mb-15 mt-5"
      v-show="props.titleAlertError == 'blockAccount'"
    >
        <p class="text-xs mt-10 mb-10 mr-5 ml-5 text-center mx-auto width-percentage-100">
          Uh oh! Your account has been locked for security reasons after 5
          failed login attempts.
        </p>
    </div>

    <div
      class="alert-danger mx-auto mb-15 mt-5"
      v-show="props.titleAlertError == 'OTPTryAgain'"
    >
      <div class="row">
        <img class="little mt-10 ml-10 mr-10" src="../../images/cross.png" />
        <p class="text-xs mt-10 mb-10 text-center mx-auto">
          This OTP is incorrect or has expired. Please check and try again!
        </p>
      </div>
    </div>
    <div
      class="alert-danger mx-auto mb-15 mt-5"
      v-show="props.titleAlertError == 'OTP'"
    >
      <div class="row">
        <img class="little mt-10 ml-10 mr-10" src="../../images/cross.png" />
        <p class="text-xs mt-10 mb-10 text-center mx-auto">
          This OTP is incorrect or has expired.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { LocalStorage } from 'quasar'

const props = defineProps({
  titleAlertError: { value: String, default: '' }
})

</script>

<style lang="scss" scoped>
@import '../../css/app.scss';

@include form;

.alert--error {
  .alert-danger {
    position: relative;
    color: $red;
    background: $gradient-pink;
    border: $red 1px solid;
    border-radius: 10px;
    width: 90%;
    .row {
      .little {
        width: 16px;
        height: 16px;
      }

      p {
        width: calc(100% - 56px);
        text-align: left;
      }
    }
  }
}
</style>
