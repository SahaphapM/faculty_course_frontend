import AuthService from '@/service/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/pages/LoginView.vue'),
      meta: {
        layout: 'FullLayout',
        public: true
      }
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: () => import('../views/Forbidden/ForbiddenView.vue'),
      meta: {
        layout: 'FullLayout'
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/profile/ProfileView.vue')
    },
    {
      path: '/mainIFCurriculumView',
      name: 'mainIFCurriculumView',
      component: () => import('../views/IFCurriculum/MainIFCurriculumView.vue')
    },
    {
      path: '/AddIFAAIView',
      name: 'AddIFAAIView',
      component: () => import('../views/IFCurriculum/admin/AddIFAAI.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/users/UserView.vue')
    },
    {
      path: '/ClosView',
      name: 'ClosView',
      component: () => import('../views/Adminview/Clos/closView.vue')
    },
    {
      path: '/SkillView',
      name: 'SkillView',
      component: () => import('../views/Adminview/Skill/skillView.vue')
    },
    {
      path: '/SkillView/Detail/:id',
      name: 'SkillView/SkillDetail',
      component: () => import('../views/Adminview/Skill/Detail/skillDetail.vue')
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
      path: '/MainIFAdmin',
      name: 'MainIFAdmin',
      component: () => import('../views/IFCurriculum/admin/MainAdmin.vue')
    },
    {
      path: '/manageSubject',
      name: 'manageSubject',
      component: () => import('../views/subjects/SubjectView.vue')
    },
    {
      path: '/AddSubject',
      name: 'AddSubject',
      component: () => import('../views/subjects/AddSubjectView.vue'),
      meta: {
        layout: 'MainLayout'
      }
    },
    {
      path: '/students',
      name: 'Students',
      component: () => import('../views/student/StudentsPage.vue')
    },
    {
      path: '/teachers',
      name: 'Teachers',
      component: () => import('../views/teacher/TeacherPage.vue')
    },
    {
      path: '/courses',
      name: 'Courses',
      component: () => import('../views/course/CoursePage.vue')
    },
    {
      path: '/student/help',
      name: 'StudentHelp',
      component: () => import('../views/student/Student_help.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestComponent.vue'),
      meta: {
        public: true
      }
    }
  ]
})
router.beforeEach(async (to, from, next) => {
  const publicRoute = to.meta?.public || false
  const isAuthenticated = await AuthService.isAuthenticated()

  // Avoid redirect loops by checking the destination route
  if (to.path === '/login' && isAuthenticated) {
    // If already authenticated, no need to go to login page, redirect to the home page
    return next('/')
  }

  if (to.path === '/' && !isAuthenticated) {
    return next('/login')
  }

  // If the route is not public and the user is not authenticated, redirect to forbidden page
  if (!publicRoute && !isAuthenticated && to.path !== '/forbidden') {
    return next('/forbidden')
  }

  // Proceed to the next route
  next()
})

export default router
