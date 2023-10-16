import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import HomePage from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/saved',
      name: 'saved',
      // this generates a separate chunk (Saved.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Saved.vue')
    },
    {
      path: '/calender',
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
