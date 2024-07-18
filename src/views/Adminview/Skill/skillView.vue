<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSkillStore } from '@/stores/skills'

const skillStore = useSkillStore()
const router = useRouter()
const headers = computed(() => [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' }
])
const skills = computed(() => skillStore.skills || [])
const select = ref<string | null>(null)

onMounted(() => {
  skillStore.fetchSkills()
})

const goToSkillDetail = (id: string) => {
  router.push({ name: 'SkillView/SkillDetails', params: { id } })
}
</script>

<template>
  <v-breadcrumbs :items="['หน้าหลัก', 'หลักสูตร', 'สกิล']">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
  <p style="font-size: xx-large; margin-left: 3%">สกิล</p>

  <v-card class="ma-5">
    <v-data-table :headers="headers" :items="skills" items-per-page="5">
      <template v-slot:item="{ item }">
        <tr @click="goToSkillDetail(item.id)">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
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
