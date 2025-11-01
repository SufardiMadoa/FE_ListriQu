import Login from '@/views/authPage/Login.vue'
import Register from '@/views/authPage/Register.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/views/layout/AdminLayout.vue'
import MenuUnit from '@/views/admin/MasterMenu/MenuUnit.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import MenuRole from '@/views/admin/MasterMenu/MenuRole.vue'
import NotFound from '@/components/NotFound.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Routes tanpa layout (tanpa navbar)
    {
      path: '/login',
      name: 'login',
      // ini perubahan master 2
      // perubahan master lagi
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
    // Routes dengan layout (dengan navbar)
    {
      path: '/',
      component: AdminLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dasboard',
          component: Dashboard,
        },
        {
          path: 'master/unit',
          name: 'masterUnit',
          component: MenuUnit,
        },
        {
          path: 'master/role',
          name: 'masterRole',
          component: MenuRole,
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: NotFound,
        },
        // Tambahkan route lain yang membutuhkan navbar di sini
        // {
        //   path: 'profile',
        //   name: 'profile',
        //   component: Profile,
        // },
      ],
    },
  ],
})

// Optional: Navigation guard untuk redirect setelah login
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') // atau method auth lainnya

  if (to.name === 'login' || to.name === 'register') {
    // Jika sudah login, redirect ke dashboard
    if (isAuthenticated) {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  } else {
    // Untuk route yang membutuhkan auth
    if (!isAuthenticated) {
      next({ name: 'login' })
    } else {
      next()
    }
  }
})
export default router
