import store from '@/store'; // NEW
import Home from '@/views/Home.vue';
import LoginView from '@/views/LoginView.vue';
import PageNotFoundViewVue from '@/views/PageNotFoundView.vue';
import ProfileView from '@/views/ProfileView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ResultAddViewVue from '@/views/ResultAddView.vue';
import ResultEditViewVue from '@/views/ResultEditView.vue';
import ResultViewVue from '@/views/ResultView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: '/result/:id',
    name: 'Result',
    component: ResultViewVue,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/result/:id/edit',
    name: 'ResultEdit',
    component: ResultEditViewVue,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/result/add',
    name: 'ResultAdd',
    component: ResultAddViewVue,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: PageNotFoundViewVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
