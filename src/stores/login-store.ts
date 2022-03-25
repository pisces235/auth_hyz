import { defineStore } from 'pinia';


export const useLoginStore = defineStore('login', {
  state: () => ({
    countLoginFail: 0,
    countDownBlock: 6,
  }),
  getters: {

  },
  actions: {
    incrementCountLoginFail() {
      this.countLoginFail++;
    },
    reductionCountDownBlock() {
      this.countDownBlock--;
    },
    setCountDownFail(s, m) {
      this.countDownFail = s + 60 * m
    }
  },
});
