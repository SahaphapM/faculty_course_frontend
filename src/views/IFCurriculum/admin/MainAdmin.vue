<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import http from '@/service/http'
import { useCurriculumStore } from '@/stores/curriculums'
import type { Curriculum } from '@/types/Curriculums'
import { useUserStore } from '@/stores/user'
import type { User } from '@/types/User'
import type { VForm } from 'vuetify/components'
const curriculumStore = useCurriculumStore()
const userStore = useUserStore()
const curriculums = computed(() => curriculumStore.curriculums)
onMounted(async () => {
  await curriculumStore.fetchCurriculums()
})

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Thai Name', value: 'thaiName' },
  { text: 'English Name', value: 'engName' },
  { text: 'Thai Degree Name', value: 'thaiDegreeName' },
  { text: 'English Degree Name', value: 'engDegreeName' }
]
</script>
<template>
  <div class="bg-grey-lighten-4">
    <v-container class="d-flex" style="max-width: 1000px">
      <v-data-table :headers="headers" :items="curriculums" density="compact" item-key="id"></v-data-table>
    </v-container>
  </div>
</template>
<style scoped></style>
