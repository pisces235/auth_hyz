import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance } from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}
const token =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTk1MjE3MDViOGE4ZDZhMzM1YzkyNyIsImlhdCI6MTY0ODEzODM5NSwiaXNzIjoiaHR0cHM6Ly9zcWtpaS5jb20ifQ.Iyc5WqwVCDnVXaymj55MUZPhD878wqAogMq43nY14TgUJen6FaNHLlVKaLnktHE2TVHn23jQIjK6jXAnG2OF-hO3BbXnp18fa5u8rEDcTS5mokwCQbxhucN8Wl4z9hqRkUVqLkvttBbkWQPm1Gila-r17VRbFC8mTT6lGiw6CPQ'
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: 'https://hyz22be.signals.vn/',
  // withCredentials: false,
  headers: {
    Accept: '*/*',
    'Content-type': 'application/json'
  }
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
