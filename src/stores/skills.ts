import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Skill } from '@/types/Skills'
import skillService from '@/service/skills'

export const useSkillStore = defineStore('skill', () => {
  const skills = ref<Skill[]>([])
  const currentSkill = ref<Skill | null>(null)

  const initialSkill: Skill = {
    id: '',
    name: '',
    description: '',
    colorsTag: ''
  }

  const editedSkill = ref<Skill>({ ...initialSkill })

  function clearCurrentSkill() {
    currentSkill.value = null
  }

  const addSkill = (skill: Skill) => {
    skills.value.push(skill)
  }

  async function fetchSkill(id: string) {
    const res = await skillService.getSkill(id)
    editedSkill.value = res.data
  }

  async function fetchSkills() {
    const res = await skillService.getSkills()
    skills.value = res.data
  }

  async function saveSkill() {
    const skill = editedSkill.value
    await skillService.addSkill(skill)
  }

  async function updateSkill() {
    const skill = editedSkill.value
    await skillService.updateSkill(skill)
  }

  async function deleteSkill(id: string) {
    await skillService.delSkill(id)
    await fetchSkills()
  }

  function clearForm() {
    editedSkill.value = { ...initialSkill }
  }

  return {
    skills,
    editedSkill,
    currentSkill,
    addSkill,
    updateSkill,
    clearCurrentSkill,
    fetchSkill,
    fetchSkills,
    saveSkill,
    deleteSkill,
    clearForm
  }
})
