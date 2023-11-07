import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import HomePage from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: HomePage
    },
    {
      path: '/uploads',
      name: 'uploads',
      // this generates a separate chunk (Saved.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Uploads.vue')
    },
    {
      path: '/calender/:filename?',
      name: 'calender',
      // this generates a separate chunk (Calender.[hash].js) for this route
      component: () => import('../views/Calender.vue')
    },
    {
      path: '/recent',
      name: 'recent',
      // this generates a separate chunk (Recent.[hash].js) for this route
      component: () => import('../views/Recent.vue')
    },
    {
      path: '/timer',
      name: 'timer',
      // this generates a separate chunk (Timer.[hash].js) for this route
      component: () => import('../views/Timer.vue')
    },
  ]
})

export default router
