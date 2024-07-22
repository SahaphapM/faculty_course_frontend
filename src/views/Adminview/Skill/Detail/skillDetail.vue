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

onMounted(() => {
  if (route.params.id) {
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
  <div>Hello World</div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
