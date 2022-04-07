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
      { path: 'signup', component: () => import('pages/SignupPage.vue') },
      {
        path: 'password/forget',
        component: () => import('src/pages/ForgotPasswordPage.vue')
      },
      {
        path: 'password/create-new',
        component: () => import('src/pages/CreateNewPasswordPage.vue')
      },
      {
        path: 'password/reset',
        component: () => import('src/pages/CreateResetPasswordPage.vue')
      },
      {
        path: 'browser/block',
        component: () => import('src/pages/BlockBrowserPage.vue')
      },
      {
        path: 'account/block',
        component: () => import('pages/AccountBlockPage.vue')
      }
    ]
  },
  {
    path: '/password/reset/confirm',
    component: () => import('src/pages/ConfirmResetPasswordPage.vue')
  },
  {
    path: '/password/create-new/confirm',
    component: () => import('src/pages/ConfirmNewPasswordPage.vue')
  }
]

export default routes
