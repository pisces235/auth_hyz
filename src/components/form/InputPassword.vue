<template>
  <div class="form-field mt-md">
    <input
      :type="input_type"
      class="form-input form-input--password w-100"
      :class="{ 'border-danger': props.isNotPassword }"
      placeholder=" "
      v-model="emits.password"
    />
    <label for="Password" class="form-label">Password</label>
    <p class="form-btn--showpw" @click="changeType()">
      <q-icon name="mdi-eye-outline" />
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
let input_type = ref('password');
const props = defineProps({
  isNotPassword: Boolean,
})

const emits = defineEmits(['password', 'value'])

const changeType = () => {
  if (input_type.value === 'password') input_type.value = 'text';
  else input_type.value = 'password';
};
</script>

<style lang="scss" scoped>
@import '../../css/app.scss';

@include form;
</style>
