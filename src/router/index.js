import Register from '@/views/authPage/Register.vue'
import LandingPage from '@/views/authPage/loginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Routes tanpa layout (tanpa navbar)
    {
      path: '/login',
      name: 'login',
      component:LandingPage,
      // ini perubahan master 2
      // perubahan master lagi
    }
    
]})

// Optional: Navigation guard untuk redirect setelah login

export default router
