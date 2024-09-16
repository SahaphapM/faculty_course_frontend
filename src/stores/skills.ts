import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Skill } from '@/types/Skills'
import skillService from '@/service/skills'
import type { PageParams } from '@/types/PageParams'

export const useSkillStore = defineStore('skill', () => {
  const skills = ref<Skill[]>([])
  const dataInit = ref(true)
  const totalSkills = ref(0)
  const initialSkill: Skill = {
    id: '',
    name: '',
    description: '',
    colorsTag: ''
  }

  const editedSkill = ref<Skill>({ ...initialSkill })

  async function fetchSkill(id: string): Promise<Skill> {
    dataInit.value = false;
    const res = await skillService.getSkill(id);
    editedSkill.value = res.data;
    console.log(skills.value);
    console.log(editedSkill.value);
    dataInit.value = true;
    return res.data; // Ensure it returns the Skill object
}
  // async function fetchSkills() {
  //   const res = await skillService.getSkills()
  //   skills.value = res.data
  // }
  async function fetchSkillsPage(params: PageParams) {
    const res = await skillService.getSkillsByPage(params)
    console.log("call skill")
    skills.value = res.data.data
    console.log(skills.value);
    totalSkills.value = res.data.total

  }

  async function setCurrentSkill(id: string) {
    const res = await skillService.getSkill(id)
    editedSkill.value = res.data
    // currentSkill.value = editedSkill.value
    console.log(editedSkill.value)
  }

  async function addSkill(addSkill: any) {
    console.log(addSkill)
    await skillService.addSkill(addSkill)
  }

  async function updateSkill(updatedSkill: Skill) {
    console.log(updatedSkill)
    await skillService.updateSkill(updatedSkill)
  }

  async function deleteSkill(id: string) {
    await skillService.delSkill(id)
    // await fetchSkills()
  }

  function clearForm() {
    editedSkill.value = { ...initialSkill }
  }

  return {
    skills,
    dataInit,
    editedSkill,
    totalSkills,
    addSkill,
    updateSkill,
    fetchSkill,
    fetchSkillsPage,
    setCurrentSkill,
    // fetchSkills,
    deleteSkill,
    clearForm
  }
})
