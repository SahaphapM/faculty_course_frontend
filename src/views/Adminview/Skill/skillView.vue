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
  <v-breadcrumbs :items="['หน้าหลัก', 'หลักสูตร', 'สกิล']">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>

  <p style="font-size: 30px">Skill</p>

  <v-spacer></v-spacer>

  <v-row cols="12">
    <v-col cols="5">
      <v-text-field
        :loading="loading"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Search templates"
        v-model="pageParams.search"
        variant="solo"
        rounded="xl"
        hide-details
        single-line
        @click:append-inner="fetchSkill()"
      ></v-text-field>
    </v-col>

    <v-spacer></v-spacer>
    <!-- ใช้ spacer -->

    <v-col cols="auto">
      <!-- เปลี่ยน cols เป็น auto -->
      <v-btn width="120" height="40" rounded="xl" @click="navigateToDetail('addSkill')">
        Add
      </v-btn>
    </v-col>
  </v-row>
  <v-row> <v-col></v-col></v-row>
  <v-card class="mx-auto">
    <v-data-table-server
      v-model:items-per-page="pageParams.limit"
      :headers="headers"
      :items="skills"
      :items-length="skillStore.totalSkills"
      :loading="loading"
      item-value="name"
      @update:options="updateOptions"
      class="custom-header"
      rounded="lg"
    >
      <template v-slot:item="{ item }">
        <tr @click="navigateToDetail(item.id)" class="clickable-row">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
        </tr>
      </template>
    </v-data-table-server>
  </v-card>
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