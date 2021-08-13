import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/sign-in',
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/chat',
      component: () => import('../views/Chat.vue')
    },
  ]
})

export default router