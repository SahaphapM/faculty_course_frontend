import type { PageParams } from '@/types/PageParams'
import http from './http'
import type { Skill } from '@/types/Skills'

function addSkill(skill: Skill) {
  return http.post('/skills', skill)
}

function updateSkill(skill: Skill) {
  return http.patch(`/skills/${skill.id}`, skill)
}

function delSkill(id: string) {
  return http.delete(`/skills/${id}`)
}

function getSkills() {
  return http.get<Skill[]>('/skills')
}
function getSkillsByPage(params: PageParams) {
  console.log(params)

  return http.get<{ data: Skill[]; total: number }>(`/skills/pages`, { params })
}

function getSkill(id: string) {
  return http.get<Skill>(`/skills/${id}`)
}

export default {
  addSkill,
  updateSkill,
  delSkill,
  getSkills,
  getSkillsByPage,
  getSkill
}