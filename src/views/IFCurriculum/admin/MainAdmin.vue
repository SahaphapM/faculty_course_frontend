<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import http from '@/service/http'
import { useCurriculumStore } from '@/stores/curriculums'
import type { Curriculum } from '@/types/Curriculums'
import { useFacultyStore } from '@/stores/faculty'
import type { Faculty } from '@/types/Faculty'
import type { Branch } from '@/types/Branch'
import { useBranchStore } from '@/stores/branch'
import type { VForm } from 'vuetify/components'
const branchStore = useBranchStore()
const curriculumStore = useCurriculumStore()
const facultyStore = useFacultyStore()
const curriculums = computed(() => curriculumStore.curriculums)
const faculties = computed(() => facultyStore.faculties)
const branches = computed(() => branchStore.branches)
const setCurrentCurriculum = (curriculum: Curriculum) => {
  curriculumStore.setCurrentCurriculum(curriculum.id)
}

const search = ref('')
const select = ref('')
onMounted(async () => {
  await curriculumStore.fetchCurriculums()
  await facultyStore.fetchFaculties()
  await branchStore.getBranches()
})
const facultiesOptions = computed(() => {
  return faculties.value.map((faculty) => {
    return `${faculty.id} ${faculty.name}`
  })
})
const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Thai Name', value: 'thaiName' }
]

const filteredBranches = computed(() => {
  const selectedFacultyId = select.value.substring(0, select.value.indexOf(' '))

  return branches.value.filter((branch: Branch) => branch.faculty.id === selectedFacultyId)
})

const filteredCurriculums = computed(() => {
  const selectedFacultyId = select.value.substring(0, select.value.indexOf(' '))
  if (selectedFacultyId == null || selectedFacultyId == '') {
    return curriculumStore.curriculums
  } else {
    const filteredBranches = branches.value.filter(
      (branch: Branch) => branch.faculty.id === selectedFacultyId
    )
    return filteredBranches.flatMap((branch: Branch) => branch.curriculums)
  }
})
</script>
<template>
  <v-container>
    <div class="bg-grey-lighten-4" style="height: 1000px">
      <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
          <v-icon icon="mdi-video-input-component"></v-icon>&nbsp; Find a Graphics Card

          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            density="compact"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            flat
            hide-details
            single-line
          ></v-text-field>
        </v-card-title>

        <v-divider></v-divider>

        <v-data-table v-model:search="search" :headers="headers" :items="filteredCurriculums">
        </v-data-table>
      </v-card>

      <v-card class="elevation-5" rounded="lg">
        <p class="details-text" style="font-size: 2.5vh">หลักสูตร</p>
        <v-container>
          <v-row>
            <v-col> <p class="details-text" style="font-size: 2.5vh">คณะ</p> </v-col
            ><v-col cols="9">
              <v-combobox
                v-model="select"
                :items="facultiesOptions"
                variant="outlined"
                rounded="lg"
              ></v-combobox>
            </v-col>
          </v-row>
        </v-container>

        <v-table :search="search" class="pa-5">
          <thead>
            <tr>
              <th class="text-left" colspan="5">ระดับการศึกษา : ปริญญาตรี ปกติ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredCurriculums" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.thaiName }}</td>

              <td>
                <v-btn
                  icon="mdi-pencil"
                  variant="text"
                  to="AddIFAAIView"
                  @click="setCurrentCurriculum(item)"
                ></v-btn>
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
