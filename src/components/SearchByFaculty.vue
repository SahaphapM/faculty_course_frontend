<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import http from '../service/http'

const props = defineProps<{
  fetchData: (search: string, facultyId: string, branchId: string) => void
}>()

const faculties = ref<any[]>([])
const selectedFaculty = ref<any>(null)
const selectedBranch = ref<any>(null)
const branches = ref<any[]>([])

// Fetch faculties and branches
const fetchFacultiesAndBranches = async () => {
  try {
    const response = await http.get('/faculties/getBranchIds') // Adjust the URL as needed
    faculties.value = response.data
  } catch (error) {
    console.error('Failed to fetch faculties and branches:', error)
  }
}

// Watch for changes in selectedFaculty and update branches accordingly
watch(selectedFaculty, (newFaculty) => {
  if (newFaculty && newFaculty.branches) {
    branches.value = newFaculty.branches
    selectedBranch.value = branches.value[0]
  } else {
    branches.value = []
    selectedBranch.value = null
  }
})

watch(selectedBranch, (newBranch) => {
  if (newBranch) {
    props.fetchData('', selectedFaculty.value.id, newBranch.id)
  } else {
    branches.value = []
  }
})

// const handleBranchChange = (branchId: string, facultyId: string) => {
//   console.log('branchId : ', branchId, '   facultyId : ', facultyId)
//   // Call the fetchData function with the new parameters
//   props.fetchData('', facultyId, branchId)
// }

onMounted(() => {
  fetchFacultiesAndBranches()
})
</script>

<template>
  <v-row>
    <v-col cols="12" md="7">
      <v-select
        v-model="selectedFaculty"
        :items="faculties"
        item-title="name"
        item-value="id"
        label="Faculty"
        clearable
        variant="outlined"
        rounded="lg"
        :return-object="true"
        style="height: 55px; width: 100%; min-width: 150px"
      ></v-select>
    </v-col>
    <v-col cols="12" md="5">
      <v-select
        v-model="selectedBranch"
        :items="branches"
        item-title="name"
        item-value="id"
        label="Branch"
        clearable
        variant="outlined"
        rounded="lg"
        :return-object="true"
        style="height: 55px; width: 100%; min-width: 150px"
      ></v-select>
    </v-col>
  </v-row>
</template>

<style scoped>
/* Add your styles here if needed */
</style>
