<template>
  <div
          class="form-field mb-20"
        >
          <div class="alert-danger">
            <div class="incorect-number row">
              <img class="little mt-10 ml-10 mr-10" src="../images/cross.png" />
              <p class="text-sm mt-s10 mb-10">
                Hm... There isn’t an account registered with the number you’ve
                entered. Please check and try again!
              </p>
            </div>
          </div>
        </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  text: String,
})
</script>

<style lang="scss" scoped>
@import '../../css/app.scss';

@include form;
</style>
