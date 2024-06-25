import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import facultyService from '@/service/faculty'
import type { Faculty } from '@/types/Faculty'

export const useFacultytore = defineStore('faculty', () => {

  const faculty = ref<Faculty[]>([])
  const initialFaculty: Faculty = {
    name: ''
  }
  const editedFaculty = ref<Faculty>(JSON.parse(JSON.stringify(initialFaculty)))

  async function getFaculty(id: number) {
    const res = await facultyService.getFaculty(id)
    editedFaculty.value = res.data
  }
  async function getfaculties() {

      const res = await facultyService.getfaculties()
      // console.log(res.data)
      faculty.value = res.data
  }
  async function savefaculty() {
    const faculty = editedFaculty.value
    if (!faculty.id) {
      // Add new
      console.log('Post ' + JSON.stringify(faculty))
      const res = await facultyService.addFaculty(faculty)
    } else {
      // Update
      console.log('Patch ' + JSON.stringify(faculty))
      const res = await facultyService.updateFaculty(faculty)
    }

    await getfaculties()
  }
  async function deleteFaculty() {
    const role = editedFaculty.value
    const res = await facultyService.delFaculty(faculty)
    await getfaculties()
  }

  function clearForm() {
    editedFaculty.value = JSON.parse(JSON.stringify(editedFaculty))
  }
  return { faculty, getfaculties, savefaculty, deleteFaculty, editedFaculty, getFaculty, clearForm }
})
