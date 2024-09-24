import AuthService from '@/service/auth'
import router from '.'

export const guardRouter = async () => {
  await router.beforeEach(async (to, from, next) => {
    if (to.path !== '/forbidden' && !to.meta.public) {
      const authenticated = AuthService.isAuthenticated()
      if (!authenticated) {
        return next('/forbidden')
      }
    }
    next()
  })
}
