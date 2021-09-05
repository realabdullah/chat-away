import { createRouter, createWebHistory } from 'vue-router'
import { projectAuth } from '../firebase/config'

//auth guard
const requireAuth = (to,from, next) => {
  let user = projectAuth.currentUser
  if(!user) {
    next({
      path: '/register'
    })
  } else {
    next()
  }
}


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
      path: '/chat',
      component: () => import('../views/Chat.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/profile/:id',
      component: () => import('../views/UserProfile.vue')
    }
  ]
})

export default router