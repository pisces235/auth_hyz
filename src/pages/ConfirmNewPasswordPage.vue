<template>
  <div class="container width-percentage-100 relative-position mx-auto">
    <div class="img-top">
      <img
        src="/images/curve.png"
        alt=""
        class="width-percentage-100 mt-25 z-10"
      />
      <div class="title absolute-top text-center text-lg">You're all set</div>
    </div>
    <div class="contain-text middle text-center text-alert--danger font-bold">
      <!-- <p class="mx-auto">
        You have successfully reset your password.<br />You can now use your new
        password to log in to your account.
      </p> -->
    </div>
    <div class="image-bottom width-percentage-100 absolute-bottom">
      <img src="/images/Group 19688.png" alt="" class="width-percentage-100" />
    </div>
    <div class="btn-bottom ml-md absolute-bottom mb-md">
      <router-link to="/login" class="mx-auto">
        <ButtonForm
          :btnTitle="'Start playing!'"
          :btnColor="'danger'"
          class="mb-15 mx-auto"
          :imgSrc="'/images/bg_btn_danger.png'"
          :imgWidth="'280'"
          :imgHeight="'44'"
        />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonForm from '../components/form/ButtonForm.vue'
</script>

<style lang="scss" scoped>
@import '../css/app.scss';

.container {
  background: linear-gradient(#fa6f51, #fff1d5);
  min-height: 100vh;
  max-width: 500px;
  .img-top {
    color: $other-nude;
    .title {
      margin-top: 15%;
      @include responsive(sm) {
        margin-top: 14%;
      }
    }
  }
  .contain-text {
    background: url('/images/fireworks.png') center top no-repeat;
    height: 160px;
    background-size: auto;
    display: block;
    @include responsive(sm) {
      top: 25%;
    }
    position: absolute;
    top: 20%;
    font-weight: bold;
    width: 100%;
    p {
      padding-top: 22%;
      width: 83%;
    }
  }
  @include form;
  .btn-bottom {
    a {
      display: block;
      width: fit-content;
    }
  }
}
</style>
