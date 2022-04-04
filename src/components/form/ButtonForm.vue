<template>
  <div class="form-field mx-auto relative-position width-percentage-100" >
    <button
      class="btn login fit-content mx-auto"
      :class="{
        'danger': props.color_btn == 'danger',
        'warning': props.color_btn == 'warning',
        'info': props.color_btn == 'info'
      }"
    >
      <img
        :src="props.src"
        alt=""
        :class="'width-' + props.width + ' height-' + props.height"
        class="mx-auto"
      />
      <div class="btn-title absolute-top text-center">
        {{ props.title_btn }} <span v-if="LocalStorage.getItem('countInputWrong') == 3">{{LocalStorage.getItem('timeBlockBtn')}}</span>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { LocalStorage } from 'quasar';

const props = defineProps({
  title_btn: String,
  color_btn: String,
  src: String,
  width: String,
  height: String
})
</script>

<style lang="scss" scoped>
@import '../../css/app.scss';

@include form;
</style>
