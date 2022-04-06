import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),

    children: [
      {
        path: '',
        component: () => import('pages/LandingPage.vue')
      },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      {
        path: 'browser/block',
        component: () => import('src/pages/BlockBrowserPage.vue')
      },
      {
        path: 'password/forget',
        component: () => import('src/pages/ForgotPasswordPage.vue')
      },
      {
        path: 'password/create-new',
        component: () => import('src/pages/CreateNewPasswordPage.vue')
      },
      {
        path: 'account/block',
        component: () => import('pages/AccountBlockPage.vue')
      },
    ]
  },
  {
    path: '/create-new-pass-confirm',
    component: () => import('src/pages/ConfirmNewPasswordPage.vue')
  }
]

export default routes
