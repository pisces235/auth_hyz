import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LandingPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'login-block', component: () => import('pages/LoginBlockPage.vue') },
      { path: 'account-block', component: () => import('pages/AccountBlockPage.vue') },
      { path: 'forgot-password', component: () => import('pages/ForgotPassPage.vue') },
      { path: 'create-password', component: () => import('pages/CreatePassPage.vue') },

    ],

  },
  { path: '/create-pass-confirm', component: () => import('pages/CreatePassConfirmPage.vue') },
];

export default routes;
