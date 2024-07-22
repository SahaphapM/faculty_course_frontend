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

function getSkill(id: string) {
  return http.get<Skill>(`/skills/${id}`)
}

export default {
  addSkill,
  updateSkill,
  delSkill,
  getSkills,
  getSkill
}