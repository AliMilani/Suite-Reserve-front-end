import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { loginRedirect: true },
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/contactUs',
      name: 'contactUs',
      component: () => import('../views/ContactUsView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/terms_of_Use',
      name: 'termsOfUse',
      component: () => import('../views/TermsOfUse.vue')
    },
    {
      path: '/payment',
      name: 'payment',
      meta: { payAuth: true },
      component: () => import('../views/PaymentPage.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'reservation',
          component: () => import('../views/DashboardViews/ReservationRoom.vue')
        },
        {
          path: 'bankTrannactions',
          name: 'bankTrannactions',
          component: () => import('../views/DashboardViews/BankTransactions.vue')
        },
        {
          path: 'companions',
          name: 'companions',
          component: () => import('../views/DashboardViews/CompanionsUser.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  await store.dispatch('onStart')
  if (to.meta.requiresAuth && !store.state.isAuthenticated) {
    return {
      path: '/login'
    }
  }
  if (to.meta.loginRedirect && store.state.isAuthenticated) {
    return {
      path: '/dashboard'
    }
  }

  // if(to.meta.payAuth && )
})

export default router
