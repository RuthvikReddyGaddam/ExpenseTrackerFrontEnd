import { createRouter, createWebHistory } from 'vue-router';
import IncomePage from './pages/income/IncomePage';
import DashBoard from './pages/dash/DashBoard';
import UserAuth from './pages/auth/UserAuth.vue'
import UserProfile from './pages/profile/UserProfile.vue'
import ExpensePage from './pages/expenses/ExpensePage.vue';
import store from './store/index';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/dash' },
        {path: '/profile', component: UserProfile, meta: {requiresAuth: true}},
        { path: '/auth',  component: UserAuth, name: "auth", meta: {isLoggedOut: true}},
        { path: '/dash', component: DashBoard, meta: {requiresAuth: true}},
        { path: '/expenses', component: ExpensePage, meta: {requiresAuth: true}},
        { path: '/income', component: IncomePage, meta: {requiresAuth: true} },
    ]
});

router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters["auth/isAuthenticated"]) {
      next('/auth');
    } else if (to.meta.isLoggedOut && store.getters["auth/isAuthenticated"]) {
      next('/dash');
    } else {
      next();
    }
  });


export default router;