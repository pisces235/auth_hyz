import { defineStore } from 'pinia';


export const useLayoutStore = defineStore('login', {
  state: () => ({
    countLoginFail: 0,
    countDownBlock: 6,
    hideLayout: false
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
