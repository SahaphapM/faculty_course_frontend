<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSkillStore } from '@/stores/skills'

const route = useRoute()
const skillStore = useSkillStore()
const skills = computed(() => skillStore.editedSkill)

async function fetchSkillDetail(id: string) {
  try {
    await skillStore.fetchSkill(id)
  } catch (error) {
    console.error('Failed to fetch skill details:', error)
  }
}

function saveSkill() {
  if (route.params.id !== 'addSkill') {
    skillStore.updateSkill(skills.value)
  } else {
    skillStore.addSkill(skills.value)
  }
}

onMounted(() => {
  if (!route.params.id) return
  else if (route.params.id == 'addSkill') {
    console.log('addSkill')
  } else {
    fetchSkillDetail(route.params.id as string)
  }
})
</script>

<template>
  <v-breadcrumbs :items="['หน้าหลัก', 'หลักสูตร', 'สกิล']">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
  <p style="font-size: xx-large; margin-left: 3%">รายละเอียดสกิล</p>
  <v-container style="mx-4"
    ><v-row>
      <v-col cols="12">
        <v-text-field
          v-model="skills.id"
          :counter="10"
          label="First name"
          hide-details
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="skills.name"
          :counter="10"
          label="First name"
          hide-details
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="skills.description"
          :counter="10"
          label="First name"
          hide-details
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="skills.colorsTag"
          :counter="10"
          label="First name"
          hide-details
          required
        ></v-text-field>
      </v-col> </v-row
    ><v-row><v-btn @click="saveSkill()"> Button </v-btn></v-row></v-container
  >
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
