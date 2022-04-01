<template>
  <div class="form-field">
    <input
      type="text"
      class="form-input form-input--text width-percentage-100"
      :class="{ 'border-danger': LocalStorage.getItem('isWrongMobileNumber') }"
      placeholder=" "
      v-model="number"
      @keypress="changeNumber()"
      @keydown="changeNumber()"
      @mouseleave="changeNumber(), changeResult()"
      maxlength="24"
    />
    <label for="mobile-number" class="form-label">Mobile Number</label>
    <select name="" id="" class="form-select" v-model="firstNumber">
      <option v-for="(text, i) in listFirstNumber" :key="i" :value="text">
        +{{ text }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LocalStorage } from 'quasar'

let number = ref('')
let firstNumber = ref('64')

const listFirstNumber = ['65', '84']
const props = defineEmits(['mobile_number'])

const changeNumber = () => {
  number.value = number.value
    .replace(/[^\d]/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim()
}
const changeResult = () => {
  // eslint-disable-next-line vue/no-mutating-props
  props.mobile_number =
    firstNumber.value + number.value.replace(/\s/g, '').trim()
}
</script>

<style scoped></style>
