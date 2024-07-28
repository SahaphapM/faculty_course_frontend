interface Menu {
  title: string
  to: string
}

export const appBarMenu: Menu[] = [
  { title: 'home', to: '/' },
  { title: 'news', to: '/news' },
  { title: 'curriculums', to: '/mainIFCurriculumView' },
  { title: 'data center', to: '/dataCenter' },
  { title: 'contact', to: '/contacts' }
]

export const adminMenu: Menu[] = [
  { title: 'curriculums management', to: '/MainAdmin' },
  { title: 'subjects management', to: '/manageSubject' },
  { title: 'users management', to: '' },
  { title: 'skill view', to: '/SkillView' }
]

export function getAllAppMenu() {
  return appBarMenu.concat(adminMenu)
}
