import http from './http'
import type { Teacher } from '@/types/Teachers'
import type { PageParams } from '@/types/PageParams'

function addTeacher(teacher: Teacher) {
  console.log(teacher)
  return http.post('/teachers', teacher)
}

function updateTeacher(teacher: Teacher) {
  return http.patch(`/teachers/${teacher.id}`, teacher)
}

function updateImageTeacher(teacherId: string, file: File) {
  const formData = new FormData()
  formData.append('image', file) // 'image' should match the name in the @UseInterceptors(FileInterceptor('image'))
  return http.post(`/teachers/${teacherId}/image/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

function delTeacher(id: string) {
  return http.delete(`/teachers/${id}`)
}

function getTeachers() {
  return http.get<Teacher[]>('/teachers')
}

function getTeacher(id: string) {
  return http.get<Teacher>(`/teachers/${id}`)
}

function getTeachersByPage(params: PageParams) {
  return http.get<{ data: Teacher[]; total: number }>(`/teachers/pages`, { params })
}

export default {
  addTeacher,
  updateTeacher,
  delTeacher,
  getTeachers,
  getTeacher,
  getTeachersByPage,
  updateImageTeacher
}
