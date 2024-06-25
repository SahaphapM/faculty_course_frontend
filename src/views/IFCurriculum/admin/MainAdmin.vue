<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import http from '@/service/http'
import { useCurriculumStore } from '@/stores/curriculums'
import type { Curriculum } from '@/types/Curriculums'
import { useFacultytore } from '@/stores/faculty'
import type { Faculty } from '@/types/Faculty'
import type { VForm } from 'vuetify/components'
const curriculumStore = useCurriculumStore()
const facultyStore = useFacultytore()
const curriculums = computed(() => curriculumStore.curriculums)
const faculties = computed(() => facultyStore.faculty)
const search = ref('')
const select = ref('')
onMounted(async () => {
  await curriculumStore.fetchCurriculums()
  await facultyStore.getfaculties()
})

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Thai Name', value: 'thaiName' }
]
</script>
<template>
  <v-container class="d-flex" style="max-width: 700px">
    <div class="bg-grey-lighten-4">
      <v-card
        class="elevation-5"
        rounded="lg"
        max-width="800px"
        width="800px"
        style="min-width: 40vh"
      >
        <p class="details-text" style="font-size: 2.5vh">หลักสูตร</p>
        <v-container>
          <v-row>
            <v-col> <p class="details-text" style="font-size: 2.5vh">คณะ</p> </v-col
            ><v-col cols="9">
              <v-combobox
                v-model="select"
                :items="faculties.map((faculty) => faculty.name)"
                variant="outlined"
                rounded="lg"
              ></v-combobox>
            </v-col>
          </v-row>
        </v-container>

        <v-table :search="search">
          <thead>
            <tr>
              <th class="text-left" colspan="5">ระดับการศึกษา : ปริญญาตรี ปกติ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in curriculums" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.thaiName }}</td>
              <td>{{ item.period }}</td>
              <td>{{ item.minimumGrade }}</td>
              <td>
                <v-btn icon="mdi-pencil" variant="text" to="AddIFAAIView"></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </div>
  </v-container>
</template>
<style scoped>
.details-text {
  margin-left: 10px; /* Adjust the spacing between the div and p as needed */
  font-weight: bold;
  font-size: large;
}
</style>
