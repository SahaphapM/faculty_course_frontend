import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: 'MainLayout',
        requireAuth: false
      }
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/news/NewsView.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: false
      }
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('../views/contacts/ContactsView.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: false
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginView.vue'),
      meta: {
        layout: 'FullLayout'
      }
    },
    {
      path: '/mainIFCurriculumView',
      name: 'mainIFCurriculumView',
      component: () => import('../views/IFCurriculum/MainIFCurriculumView.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/AddIFAAIView',
      name: 'AddIFAAIView',
      component: () => import('../views/IFCurriculum/admin/AddIFAAI.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/users',
      name: 'users',
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
      path: '/SkillView/SkillDetails/:id',
      name: 'SkillView/SkillDetails',
      component: () => import('../views/Adminview/Skill/Detail/skillDetail.vue'),
      meta: {
        topic: 'MainLayout'
      }
    },
    {
      path: '/MainAdmin',
      name: 'MainAdmin',
      component: () => import('../views/IFCurriculum/admin/MainAdmin.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/test',
      name: 'test',
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
