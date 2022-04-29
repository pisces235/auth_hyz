<template>
  <div class="alert--info width-percentage-100">
    <div
      class="form-field mb-20 row justify-between"
      v-show="titleAlertInfo === 'mobileNumber'"
    >
      <img src="/images/Smiley_profilepic 1.png" alt="" />
      <div class="contain-text fit-content">
        <div class="arrow"></div>
        <p class="text-left text-xs pl-6 pt-10 pb-10 width-percentage-87">
          Enter the mobile number that you used to create your account
          previously.
        </p>
      </div>
    </div>
    <div
      class="form-field mb-20 row justify-between"
      v-show="titleAlertInfo === 'OTP'"
    >
      <img src="/images/Smiley_profilepic 1.png" alt="" />
      <div class="contain-text row no-wrap">
        <div class="arrow"></div>
        <p class="text-left text-xs pl-6 pt-10 pb-10">
          We've sent an SMS OTP to your mobile number for verificattion.
        </p>
      </div>
    </div>

    <div
      class="form-field mb-20 row justify-between"
      v-show="titleAlertInfo === 'signup'"
    >
      <img src="/images/Smiley_profilepic 1.png" alt="" />
      <div class="contain-text row no-wrap">
        <div class="arrow"></div>
        <p class="text-left text-xs pl-6 pt-10 pb-10">
          Enter the mobile number linked to your <b>DBS PayLah!</b> account. We
          will send the Angbao money you're collected directly to it!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  titleAlertInfo?: string
}
withDefaults(defineProps<Props>(), {
  titleAlertInfo: ''
})
</script>

<style lang="scss" scoped>
@import '../../css/app.scss';

@include form;

.alert--info {
  .form-field {
    width: 87.5%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .contain-text {
      width: calc(100% - 32px - 10px) !important;
      background-color: white;
      border-radius: 5px;
      position: relative;
      .arrow {
        position: absolute;
        display: block;
        background-color: white;
        width: 8px;
        height: 8px;
        top: 11px;
        left: -1%;
        transform: rotate(-45deg) !important;
      }
    }
    img {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
