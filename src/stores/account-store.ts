import { defineStore } from 'pinia'
import { api } from '../boot/axios'
import { LocalStorage } from 'quasar'

export const useAccountStore = defineStore('account', {
  state: () => ({
    id: '',
    isLogin: false
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
      LocalStorage.set('token', response.data.data.token)
      this.id = response.data.data.user.id

      return { response: response }
    }
  }
})
