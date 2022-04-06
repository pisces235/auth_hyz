<template>
  <div class="form-field row justify-center">
    <button
      class="btn relative-position justify-center"
      :class="{
        danger: props.btnColor == 'danger',
        warning: props.btnColor == 'warning',
        info: props.btnColor == 'info'
      }"
      :type="props.btnType"
    >
      <img
        :src="props.imgSrc"
        alt=""
        :class="
          'width-' +
          props.imgWidth +
          ' height-' +
          props.imgHeight +
          ' width-percentage-' +
          props.imgWidthPercent
        "
        class="mx-auto"
      />
      <div class="btn-title absolute-top text-center">
        {{ props.btnTitle }}
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

<script setup lang="ts">
// import { onMounted, ref, watchEffect } from 'vue'
import { LocalStorage } from 'quasar'

// const countDown = () => {
//   let timer = ref(LocalStorage.getItem('timeBlockBtn'))
//   let interval = setInterval(() => {
//     if (timer.value === 0) {
//       clearInterval(interval)
//     } else {
//       timer.value = Number(timer.value) - 1
//       LocalStorage.set('timeBlockBtn', Number(timer.value))
//     }
//   }, 1000)
//   return timer.value
// }
// let timer = ref()
// watchEffect(() => {
//   if(LocalStorage.getItem('countInputLoginWrong') == 3)
//     timer.value = countDown()
// })

const props = defineProps({
  btnType: { value: String, default: null },
  btnTitle: String,
  btnColor: String,
  imgSrc: String,
  imgWidth: String,
  imgWidthPercent: String,
  imgHeight: String
})
</script>

<style lang="scss" scoped>
@import '../../css/app.scss';

@include form;
</style>
