<template>
  <div class="container w-100 relative-position mx-auto">
    <div class="img-top">
      <img src="../images/curve.png" alt="" class="w-100 mt-xl">
      <div class="title absolute-top  text-auto f-size-lg">You're all set</div>
    </div>
    <div class="contain-text middle text-auto f-size-sm">
      <p class="mx-auto">You have successfully reset your password.<br>You can now use your new password to log in to your account.</p>
    </div>
    <div class="image-bottom w-100 absolute-bottom">
      <img src="../images/Group 19686.png" alt="" class="w-100" />
    </div>
    <div class="btn-bottom ml-md absolute-bottom mb-md">
      <div class="form-field contain-submit">
        <router-link to="/login">
          <button class="btn-submit mx-auto row enabled">
            <div class="title">
              <div class="title--front"></div>
              <div class="title--front-duplicate f-size-md">Back to log in</div>
              <div class="title--back"></div>
            </div></button
        ></router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import '../css/app.scss';

.container {
  background: linear-gradient(#fa6f51, #fff1d5);
  height: 100vh;
  max-width: 600px;
  .img-top {
    color: $other-nude;
    .title {
      margin-top: 15%;
@include responsive(sm) {
      margin-top: 14%;
    }
    }
  }
  .middle {
    @include responsive(sm) {
      top: 35%;
    }
    position: absolute;
    top: 45%;
    font-weight: bold;
    width: 100%;
    p {
      width: 83%;
    }
  }
  @include form;
  .btn-bottom {
    .btn-submit {
      border: none;
      outline: none;
      background: transparent;
    }
    @include special-bg(280px, 44px, 8px, 14px);
    .title {
      &--front,
      &--front-duplicate,
      &--back {
        border-width: 2px;
      }
      &--front-duplicate {
        line-height: 38px;
        border: none;
      }
    }
  }
}
</style>
