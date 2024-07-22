<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSkillStore } from '@/stores/skills'

const skillStore = useSkillStore()
const router = useRouter()
const route = useRoute()

const headers = computed(() => [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' }
])

const skills = computed(() => skillStore.skills || [])
const select = ref<string | null>(null)

function navigateToDetail(id: string) {
  router.push({ name: 'SkillView/SkillDetail', params: { id } })
}

function deleteSkill(id: string) {
  if (confirm('ยืนยันการลบสกิล?')) {
    skillStore.deleteSkill(id)
  }
}
onMounted(() => {
  skillStore.fetchSkills()
})
</script>

<template>
  <v-breadcrumbs :items="['หน้าหลัก', 'หลักสูตร', 'สกิล']">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
  <p style="font-size: xx-large; margin-left: 3%">สกิล</p>

  <v-row><v-btn @click="navigateToDetail('addSkill')"> Add </v-btn></v-row>
  <v-card class="ma-5">
    <v-data-table :headers="headers" :items="skills" items-per-page="5">
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>
            <v-btn icon="mdi-information" class="rounded-circle" @click="navigateToDetail(item.id)">
              edit</v-btn
            >
            <v-btn icon="mdi-information" class="rounded-circle" @click="deleteSkill(item.id)">
              delete</v-btn
            >
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
