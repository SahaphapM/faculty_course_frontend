import { ref } from 'vue'
import { defineStore } from 'pinia'
import teacherService from '@/service/teacher'
import type { PageParams } from '@/types/PageParams'
import instance from '@/service/http'
import type { Teacher } from '@/types/Teachers'

export const useTeacherStore = defineStore('teacher', () => {
  const teachers = ref<Teacher[]>([])
  const currentTeacher = ref<Teacher | null>(null)
  const totalTeachers = ref(0)

  const initialTeacher: Teacher = {
    id: '',
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'Male',
    phone: '',
    googleId: '',
    roles: [],
    image: 'unknown.jpg',
    facultyId: '',
    branchId: ''
  }

  const editedTeacher = ref<Teacher>({ ...initialTeacher })

  function clearCurrentTeacher() {
    currentTeacher.value = null
  }

  const addTeacher = (teacher: Teacher) => {
    teachers.value.push(teacher)
  }

  async function fetchTeachersPage(params: PageParams) {
    const res = await teacherService.getTeachersByPage(params)
    teachers.value = res.data.data
    totalTeachers.value = res.data.total
  }

  async function fetchTeacher(id: string) {
    const res = await teacherService.getTeacher(id)
    editedTeacher.value = res.data
  }

  async function fetchTeachers() {
    const res = await teacherService.getTeachers()
    teachers.value = res.data
  }

  async function saveTeacher() {
    const teacher = editedTeacher.value
    await teacherService.addTeacher(teacher)
  }

  async function updateTeacher() {
    const teacher = editedTeacher.value
    console.log(teacher)
    await teacherService.updateTeacher(teacher)
  }

  async function updateImage(teacherId: string, file: File) {
    await teacherService.updateImageTeacher(teacherId, file)
  }

  async function deleteTeacher(id: string) {
    await teacherService.delTeacher(id)
    await fetchTeachers()
  }

  function clearForm() {
    editedTeacher.value = { ...initialTeacher }
  }

  return {
    addTeacher,
    teachers,
    currentTeacher,
    clearCurrentTeacher,
    fetchTeacher,
    fetchTeachers,
    saveTeacher,
    deleteTeacher,
    editedTeacher,
    clearForm,
    updateTeacher,
    initialTeacher,
    fetchTeachersPage,
    totalTeachers,
    updateImage
  }
})
