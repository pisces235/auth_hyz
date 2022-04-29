<template>
  <div class="form-field text-xs mx-auto">
    <div class="check-pass mt-20">
      <div class="text mt-5 mb-5">
        In order to protect your account, make sure that your password contains:
      </div>
      <div class="min-length mt-5 mb-5" :class="{ access: check_min_length }">
        <q-icon
          name="mdi-checkbox-blank-circle-outline mb-5"
          v-if="password.length == 0"
        />
        <img src="/images/cross.png" v-else-if="!check_min_length" />
        <img src="/images/tick.png" v-else />
        At least 8 characters
      </div>
      <div class="include-number mt-5 mb-5" :class="{ access: include_number }">
        <q-icon
          name="mdi-checkbox-blank-circle-outline mb-5"
          v-if="password.length == 0"
        />
        <img src="/images/cross.png" v-else-if="!include_number" />
        <img src="/images/tick.png" v-else />
        At least 1 digit (0-9)
      </div>
      <div
        class="include-lowercase mt-5 mb-5"
        :class="{ access: include_lower }"
      >
        <q-icon
          name="mdi-checkbox-blank-circle-outline mb-5"
          v-if="password.length == 0"
        />
        <img src="/images/cross.png" v-else-if="!include_lower" />
        <img src="/images/tick.png" v-else />
        At least 1 lowercase (a-z)
      </div>
      <div
        class="include-uppercase mt-5 mb-5"
        :class="{ access: include_upper }"
      >
        <q-icon
          name="mdi-checkbox-blank-circle-outline mb-5"
          v-if="password.length == 0"
        />
        <img src="/images/cross.png" v-else-if="!include_upper" />
        <img src="/images/tick.png" v-else />
        At least 1 uppercase (A-Z)
      </div>
      <div
        class="include-special mt-5 mb-5"
        :class="{ access: include_special }"
      >
        <q-icon
          name="mdi-checkbox-blank-circle-outline mb-5"
          v-if="password.length == 0"
        />
        <img src="/images/cross.png" v-else-if="!include_special" />
        <img src="/images/tick.png" v-else />
        At least 1 special character
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const props = defineProps({
  password: { value: String, default: '' }
})
const emits = defineEmits(['update'])
const checkBtn = () => {
  emits('update', checkRules.value)
}
let password = ref('')
let check_min_length = ref(false)
let include_number = ref(false)
let include_lower = ref(false)
let include_upper = ref(false)
let include_special = ref(false)
let checkRules = ref(false)

watchEffect(() => {
  password.value = props.password
  if (password.value.length >= 8) {
    check_min_length.value = true
  } else {
    check_min_length.value = false
  }
  if (password.value.search(/[0-9]/g) != -1) {
    include_number.value = true
  } else {
    include_number.value = false
  }
  if (password.value.search(/[a-z]/g) != -1) {
    include_lower.value = true
  } else {
    include_lower.value = false
  }
  if (password.value.search(/[A-Z]/g) != -1) {
    include_upper.value = true
  } else {
    include_upper.value = false
  }
  if (password.value.search(/\W|_/g) != -1) {
    include_special.value = true
  } else {
    include_special.value = false
  }
  if (
    check_min_length.value == true &&
    include_number.value == true &&
    include_lower.value == true &&
    include_upper.value == true &&
    include_special.value == true
  ) {
    checkRules.value = true
  } else {
    checkRules.value = false
  }
  checkBtn()
})
</script>

<style lang="scss" scoped>
@import '../../css/app.scss';

@include form;
</style>
