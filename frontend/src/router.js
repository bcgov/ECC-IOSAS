import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Logout from './components/Logout.vue';

import SessionExpired from './components/SessionExpired.vue';
import ErrorPage from './components/ErrorPage.vue';
import LoginError from './components/LoginError.vue';
import Unauthorized from './components/common/Unauthorized.vue';
import { authStore } from './store/modules/auth';
import { appStore } from './store/modules/app';
import Login from './components/Login.vue';
import BackendSessionExpired from './components/BackendSessionExpired.vue';
import { PAGE_TITLES } from './utils/constants';
import ExpressionOfInterestPage from './components/EOI/ExpressionOfInterestPage.vue';
import NewExpressionOfInterestPage from './components/EOI/NewExpressionOfInterestPage.vue';
import ConfirmationPage from './components/common/ConfirmationPage.vue';
import SchoolApplicationPage from './components/applications/SchoolApplicationPage.vue';
import ProfilePage from './components/profile/ProfilePage.vue';

const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        pageTitle: PAGE_TITLES.DASHBOARD,
        requiresAuth: true,
      },
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorPage,
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: Unauthorized,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/session-expired',
      name: 'session-expired',
      component: SessionExpired,
    },
    {
      path: '/login-error',
      name: 'login-error',
      component: LoginError,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        pageTitle: PAGE_TITLES.LOGIN,
        requiresAuth: false,
      },
    },
    {
      path: '/expression-of-interest/:id',
      name: 'expressionOfInterestPage',
      component: ExpressionOfInterestPage,
      props: true,
      meta: {
        pageTitle: 'Expression of Interest',
        requiresAuth: true,
      },
    },
    {
      path: '/expression-of-interest/new',
      name: 'newExpressionOfInterest',
      component: NewExpressionOfInterestPage,
      props: {},
      meta: {
        pageTitle: 'New Expression of Interest',
        requiresAuth: false,
      },
    },
    {
      path: '/confirmation/:type',
      name: 'applicationConfirmation',
      component: ConfirmationPage,
      props: {},
      meta: {
        pageTitle: 'Application Confirmation',
        requiresAuth: false,
      },
      beforeEnter: (to, from) => {
        const isRedirected =
          from?.href?.includes('expression-of-interest') ||
          from?.href?.includes('school-application');

        if (isRedirected === undefined) {
          router.push({ name: 'home' });
        }

        return true;
      },
    },
    {
      path: '/school-application/:id',
      name: 'schoolApplicationPage',
      component: SchoolApplicationPage,
      props: {},
      meta: {
        pageTitle: 'Application',
        // requiresAuth: true,
      },
    },
    {
      path: '/user-profile',
      name: 'User Profile',
      component: ProfilePage,
      props: {},
      meta: {
        pageTitle: 'User Profile',
        requiresAuth: true,
      },
    },
    {
      path: '/:catchAll(.*)',
      name: 'notfound',
      redirect: '/',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/token-expired',
      name: 'backend-session-expired',
      component: BackendSessionExpired,
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const aStore = authStore();
  const apStore = appStore();
  // this section is to set page title in vue store
  if (to.meta.requiresAuth) {
    aStore
      .getJwtToken()
      .then(() => {
        if (!aStore.isAuthenticated) {
          next('/token-expired');
        } else {
          aStore
            .getUserInfo()
            .then(() => {
              if (to.meta.permission) {
                next('/unauthorized');
              } else if (to && to.meta) {
                apStore.setPageTitle(to.meta.pageTitle);
                next();
              }
            })
            .catch(() => {
              next('error');
            });
        }
      })
      .catch(() => {
        if (!aStore.userInfo) {
          next('/login');
        } else {
          next('/token-expired');
        }
      });
  } else {
    if (!aStore.userInfo) {
      next();
    }
    if (to && to.meta) {
      apStore.setPageTitle(to.meta.pageTitle);
    } else {
      apStore.setPageTitle('');
    }
    next();
  }
});
export default router;
