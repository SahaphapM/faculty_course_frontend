import type { PageParams } from '@/types/PageParams'
import http from './http'
import type { Clos } from '@/types/Clos'

function addClos(skill: Clos) {
  return http.post('/clos', skill)
}

function updateClos(skill: Clos) {
  return http.patch(`/clos/${skill.id}`, skill)
}

function delClos(id: string) {
  return http.delete(`/clos/${id}`)
}

function getClos() {
  return http.get<Clos[]>('/clos')
}
function getClosByPage(params: PageParams) {
  console.log(params)
  return http.get<{ data: Clos[]; total: number }>(`/clos/pages`, { params })
}

function getClo(id: string) {
  return http.get<Clos>(`/clos/${id}`)
}

export default {
  addClos,
  updateClos,
  delClos,
  getClos,
  getClosByPage,
  getClo
}
