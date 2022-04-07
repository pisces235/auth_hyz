import { defineStore } from 'pinia'
import { api } from '../boot/axios'
import { LocalStorage } from 'quasar'

export const useAccountStore = defineStore('account', {
  state: () => ({
    id: '',
    isLogin: false,
    token: '',
    titleAlertErrorBlockBrowserPage: '',
    mobile_number: '',
    otp: '',
    password: '',
  }),
  getters: {
    // setMobileNumber: (state, mb: string) => {
    //   retrun state.mobile_number = mb
    // }
  },
  actions: {
    // setMobileNumber(mb) {
    //   this.mobile_number = mb
    // },
    toggleLogin() {
      this.isLogin = !this.isLogin
    },
    //login
    async accountLogin(mobile_number, password) {
      const response = await api.post('/login', {
        mobile_number: mobile_number,
        password: password
      })
      if (response.data.data.token) {
        this.token = response.data.data.token
        this.id = response.data.data.id
      }

      return { response: response }
    },
    // forgot password
    async accountForgetPassword(mobile_number: string, otp: string, password: string) {
      const response = await api.post('/password/forget', {
        mobile_number: mobile_number,
        code: otp,
        password: password
      })
      return { response }
    },
    async accountSignup(mobile_number, password, referralCode) {
      const response = await api.post('/register', {
        mobile_number: mobile_number,
        password: password,
        referral_code: referralCode,
      })
      if (response.data.data.token) {
        this.token = response.data.data.token
        this.id = response.data.data.id
      }

      return { response: response }
    },
  }
})
