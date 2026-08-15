import { createRouter, createWebHistory } from 'vue-router'

import AccountLayout from '../layouts/AccountLayout.vue'

import OrderHistoryView from '../views/OrderHistoryView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import WishlistView from '../views/WishlistView.vue'
import ReviewsView from '../views/ReviewsView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/',
    component: AccountLayout,

    children: [
      {
        path: '',
        redirect: '/login',
      },
      {
        path: 'profile',
        name: 'Profile',
        component: ProfileView,
      },
      {
        path: 'orders',
        name: 'Orders',
        component: OrderHistoryView,
      },
      {
        path: 'wishlist',
        name: 'Wishlist',
        component: WishlistView,
      },
      {
        path: 'reviews',
        name: 'Reviews',
        component: ReviewsView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router