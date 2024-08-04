import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Clos } from '@/types/Clos'
import cloService from '@/service/clos'
import type { PageParams } from '@/types/PageParams'

export const useCloStore = defineStore('clo', () => {
  const clos = ref<Clos[]>([])
  const dataInit = ref(true)
  const totalClos = ref(0)
  const initialClo: Clos = {
    id: '',
    description: '',
    subject: '',
    clos: ''
  }

  const editedClo = ref<Clos>({ ...initialClo })

  async function fetchClo(id: string) {
    dataInit.value = false
    const res = await cloService.getClo(id)
    editedClo.value = res.data
    console.log(editedClo.value)
    dataInit.value = true
  }

  // async function fetchClos() {
  //   const res = await cloService.getClos()
  //   clos.value = res.data
  // }
  async function fetchClosPage(params: PageParams) {
    const res = await cloService.getClosByPage(params)
    clos.value = res.data.data
    totalClos.value = res.data.total
  }

  async function setCurrentClo(id: string) {
    const res = await cloService.getClo(id)
    editedClo.value = res.data
    // currentClo.value = editedClo.value
    console.log(editedClo.value)
  }

  async function addClo(addClo: any) {
    console.log(addClo)
    await cloService.addClo(addClo)
  }

  async function updateClo(updatedClo: Clo) {
    console.log(updatedClo)
    await cloService.updateClo(updatedClo)
  }

  async function deleteClo(id: string) {
    await cloService.delClo(id)
    // await fetchClos()
  }

  function clearForm() {
    editedClo.value = { ...initialClo }
  }

  return {
    clos,
    dataInit,
    editedClo,
    totalClos,
    addClo,
    updateClo,
    fetchClo,
    fetchClosPage,
    setCurrentClo,
    // fetchClos,
    deleteClo,
    clearForm
  }
})
