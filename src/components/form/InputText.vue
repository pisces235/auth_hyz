<template>
  <div class="form-field">
          <input
            type="text"
            class="form-input form-input--text w-100"
            :class="{ 'border-danger': isNotMobileNumber }"
            placeholder=" "
            v-model="number"
            @keypress="changeNumber()"
            maxlength="24"
          />
          <label for="mobile-number" class="form-label">Mobile Number</label>
          <div name="" id="" class="form-select">
              {{ firstNumber }}
          </div>
        </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
let number = ref('');
let firstNumber = ref('+64');
// const props = defineProps({

// })

</script>

<style scoped>

</style>
