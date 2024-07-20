import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/login/LoginView.vue'),
      meta: {
        layout: 'FullLayout'
      }
    },
    {
      path: '/mainIFCurriculumView',
      name: 'mainIFCurriculumView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/IFCurriculum/MainIFCurriculumView.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/AddIFAAIView',
      name: 'AddIFAAIView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/IFCurriculum/admin/AddIFAAI.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/users',
      name: 'users',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/users/userView.vue'),

      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/SkillView',
      name: 'SkillView',
      component: () => import('../views/Adminview/Skill/skillView.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/SkillView/Detail/:id',
      name: 'SkillView/SkillDetail',
      component: () => import('../views/Adminview/Skill/Detail/skillDetail.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },

    // {
    //   path: '/SkillView/Details/:id',
    //   name: 'SkillView/SkillDetails',
    //   component: () => import('../views/Adminview/Skill/Detail/skillDetail.vue'),
    //   meta: {
    //     topic: 'MainLayout'
    //   }
    // },
    {
      path: '/MainAdmin',
      name: 'MainAdmin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/IFCurriculum/admin/MainAdmin.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/test',
      name: 'test',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Test.vue'),
      meta: {
        layout: 'MainLayout'
      }
    }
  ]
})
function isLogin() {
  const user = localStorage.getItem('user')
  // const member = localStorage.getItem('member')
  if (user) {
    return true
  }
  return false
}
router.beforeEach((to, from) => {
  if (to.meta.requireAuth && !isLogin()) {
    router.replace('login')
  }
})
export default router
