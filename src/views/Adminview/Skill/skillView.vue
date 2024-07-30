<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSkillStore } from '@/stores/skills'
import type { PageParams } from '@/types/PageParams'

const skillStore = useSkillStore()
const loading = ref(false)
const router = useRouter()
const pageParams = ref<PageParams>({
  page: 1,
  limit: 10,
  sort: '',
  order: 'ASC',
  search: ''
})
const headers = computed(() => [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' }
])

const skills = computed(() => skillStore.skills || [])

function navigateToDetail(id: string) {
  router.push({ name: 'SkillView/SkillDetail', params: { id } })
}
const updateOptions = (options: any) => {
  pageParams.value.page = options.page
  pageParams.value.limit = options.itemsPerPage
  fetchSkill()
}

const fetchSkill = async () => {
  loading.value = true
  try {
    await skillStore.fetchSkillsPage(pageParams.value)
  } catch (error) {
    console.error('Error fetching curriculum:', error)
  } finally {
    loading.value = false
  }
  console.log(pageParams.value)
}

function deleteSkill(id: string) {
  if (confirm('ยืนยันการลบสกิล?')) {
    skillStore.deleteSkill(id)
  }
}
onMounted(async () => {
  await fetchSkill()
  skillStore.clearForm()
  // skillStore.fetchSkills()
})
</script>

<template>
  <v-container>
    <v-breadcrumbs :items="['หน้าหลัก', 'หลักสูตร', 'สกิล']">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <p style="font-size: xx-large; margin-left: 3%">สกิล</p>

    <v-row>
      <v-col></v-col>
      <v-col></v-col>
      <v-col></v-col>
      <v-col></v-col>
      <v-col><v-btn @click="navigateToDetail('addSkill')"> Add </v-btn></v-col>
    </v-row>
    <v-row> <v-col></v-col></v-row>
    <v-card class="mx-auto">
      <v-data-table :headers="headers" :items="skills" items-per-page="5">
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>
              <v-btn
                icon="mdi-information"
                class="rounded-circle"
                @click="navigateToDetail(item.id)"
              >
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
  </v-container>
</template>

<style>
.custom-header .v-data-table-server thead th {
  background-color: #142883; /* เปลี่ยนสีของหัวเรื่อง */
  color: white;
  font-weight: bold;
}

.custom-header .v-data-table-server tbody tr:hover {
  background-color: #f1f1f1; /* เปลี่ยนสีของแถวเมื่อ hover */
  cursor: pointer;
}
.clickable-row {
  cursor: pointer;
}
</style>
