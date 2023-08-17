import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TicketView from '../views/TicketView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: () => import('../views/AllTicketsView.vue'),
    },
    {
      path: '/ticket/:id',
      name: 'ticket',
      component: () => import('../views/TicketView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
    },
    {
      path: '/tickets/:id',
      name: 'ticket',
      component: TicketView,
      props: true
    }
  ]
});

export default router;