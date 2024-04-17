import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import DashboardView from '@/views/DashboardView.vue';
import LodgingView from '@/views/LodgingView.vue';
import { useGlobalStore } from '@/stores/global';
import FormLodgingView from '@/views/FormLodgingView.vue';
import TypeView from '@/views/TypeView.vue';
import HistoryView from '@/views/HistoryView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: DashboardView,
          props: true
        },
        {
          path: '/lodgings',
          name: 'lodging',
          component: LodgingView
        },
        {
          path: '/lodgings/create',
          name: 'formLodging',
          component: FormLodgingView
        },
        {
          path: '/lodgings/:id',
          name: 'formLodgingEdit',
          component: FormLodgingView
        },
        {
          path: '/types',
          name: 'type',
          component: TypeView
        },
        {
          path: '/histories',
          name: 'history',
          component: HistoryView
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
});

router.beforeEach((to, from, next) => {
  let { isLogin } = useGlobalStore();

  if (localStorage.access_token) {
    isLogin = true;
  }

  if (!isLogin && to.name !== 'login' && to.name !== 'register') {
    next({ name: 'login' });
  } else if (isLogin && (to.name === 'login' || to.name === 'register')) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
