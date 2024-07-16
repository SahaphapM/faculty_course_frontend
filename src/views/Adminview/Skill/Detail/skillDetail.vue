<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useSkillStore } from '@/stores/skills'
import { useRoute } from 'vue-router'

const route = useRoute()
const skillStore = useSkillStore()
const headers = computed(() => [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' }
])
const skills = computed(() => skillStore.editedSkill)
const select = ref<string | null>(null)
onMounted(async () => {
  try {
    const id = route.params.id as string
    if (id === null) {
      return
    }

    await skillStore.fetchSkill(id)
    console.log(skillStore.editedSkill)
  } catch (error) {
    console.error(error)
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

  <v-card class="ma-5" v-if="skillStore.dataInit">
    <v-data-table :headers="headers" :items="skills" items-per-page="5">
      <template v-slot:item="{ item }">
        <tr>
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
s
