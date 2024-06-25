import type { Faculty } from '@/types/Faculty'
import http from './http'

function addFaculty(faculty: Faculty) {
  return http.post('/faculties', faculty)
}

function updateFaculty(faculty: Faculty) {
  return http.patch(`/faculties/${faculty.id}`, faculty)
}

function delFaculty(faculty: Faculty) {
  return http.delete(`/faculties/${faculty.id}`)
}

function getFaculty(id: number) {
  return http.get(`/faculties/${id}`)
}

function getfaculties() {
  return http.get('/faculties')
}

export default { addFaculty, updateFaculty, delFaculty, getFaculty, getfaculties }
