import router from '@/router'

interface Menu {
  title: string
  to: string
}

export const adminMenu: Menu[] = [
  { title: 'curriculums management', to: '/MainAdmin' },
  { title: 'subjects management', to: '/manageSubject' },
  { title: 'users management', to: '' },
  { title: 'skill view', to: '/SkillView' }
]

export const allPage = () => {
  return router.getRoutes().map((n) => ({ title: n.name?.toString(), to: n.path }))
}
