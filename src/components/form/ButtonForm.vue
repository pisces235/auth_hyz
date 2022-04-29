<script setup lang="ts">

interface Props {
  btnType?:string ,
  btnTitle?:string,
  btnColor?:string,
  imgSrc?:string,
  imgBtnWidth?:string,
  imgBtnWidthPercent?:string,
  imgBtnHeight?:string
}

withDefaults(defineProps<Props>(), {
  imgBtnWidthPercent: ''
})
</script>

<template>
  <div class="form-field row justify-center">
    <button
      class="btn relative-position justify-center"
      :class="{
        danger: btnColor == 'danger',
        warning: btnColor == 'warning',
        info: btnColor == 'info'
      }"
      :type="btnType"
    >
      <img
        :src="imgSrc"
        alt=""
        :class="
          'width-' +
          imgBtnWidth +
          ' height-' +
          imgBtnHeight +
          ' width-percentage-' +
          imgBtnWidthPercent
        "
        class="mx-auto"
      />
      <div class="btn-title absolute-top text-center">
        {{ btnTitle }}
        <!-- <span
          v-show="
            LocalStorage.getItem('countInputLoginWrong') == 3 &&
            LocalStorage.getItem('timeBlockBtn') > 0
          "
          >{{ timer }}</span
        > -->
      </div>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import '../../css/app.scss';

@include form;
</style>
