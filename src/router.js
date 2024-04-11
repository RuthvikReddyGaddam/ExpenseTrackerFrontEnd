import { createRouter, createWebHistory } from 'vue-router';
import IncomePage from './pages/income/IncomePage';
import DashBoard from './pages/dash/DashBoard';
import UserAuth from './pages/auth/UserAuth.vue'
import UserProfile from './pages/profile/UserProfile.vue'
import ExpensePage from './pages/expenses/ExpensePage.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/dash' },
        {path: '/profile', component: UserProfile},
        { path: '/auth', component: UserAuth },
        { path: '/dash', component: DashBoard },
        { path: '/expenses', component: ExpensePage },
        { path: '/income', component: IncomePage },
    ]
});

export default router;