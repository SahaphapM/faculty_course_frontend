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
import type { PageParams } from '@/types/PageParams'
import DialogAddIF from '@/views/IFCurriculum/admin/DialogAddIF.vue'

const branchStore = useBranchStore()
const curriculumStore = useCurriculumStore()
const facultyStore = useFacultyStore()
const curriculums = computed(() => curriculumStore.curriculums)
const faculties = computed(() => facultyStore.faculties)
const branches = computed(() => branchStore.branches)

const loading = ref(false)
const pageParams = ref<PageParams>({
  page: 1,
  limit: 10,
  sort: '',
  order: 'ASC',
  search: ''
})
const select = ref<PageParams>({
  page: 1,
  limit: 10,
  sort: '',
  order: 'ASC',
  search: ''
})

const dialogVisible = ref(false)
const selectedItem = ref<any | null>(null)
const showDialog = (item: any) => {
  selectedItem.value = item
  dialogVisible.value = true

  // Function to set the current curriculum in the store
  const setCurrentCurriculum = (curriculum: any) => {
    curriculumStore.setCurrentCurriculum(curriculum.id)
  }

  // Call the function with the selected item
  setCurrentCurriculum(item)
}

const closeDialog = () => {
  dialogVisible.value = false
}
const expanded: any[] = []
const search = ref('')

const fetchCurriculum = async () => {
  loading.value = true
  try {
    await curriculumStore.fetchCurriculumsPage(pageParams.value)
    if (select.value.search == '') {
      await curriculumStore.fetchCurriculumsPage(pageParams.value)
    } else if (pageParams.value.search == '') {
      await curriculumStore.fetchCurriculumsPage(select.value)
    }
  } catch (error) {
    console.error('Error fetching curriculum:', error)
  } finally {
    loading.value = false
  }
  console.log(pageParams.value)
}

const updateOptions = (options: any) => {
  pageParams.value.page = options.page
  pageParams.value.limit = options.itemsPerPage
  fetchCurriculum()
}

onMounted(async () => {
  fetchCurriculum()
  await facultyStore.fetchFaculties()
  await branchStore.getBranches()
})
const facultiesOptions = computed(() => {
  return faculties.value.map((faculty) => {
    return `${faculty.name}`
  })
})
const headers = [
  { title: 'รหัสหลักสูตร', value: 'id' },
  { title: 'หลักสูตร', value: 'thaiName' },
  { title: 'ระยะเวลา', value: 'period' }
]
</script>
<template>
  <v-container>
    <div class="bg-grey-lighten-4" style="height: 1000px">
      <v-card class="pa-3" rounded="lg">
        <v-card flat>
          <v-card-title class="d-flex align-center pa-2">
            &nbsp; เล่มหลักสูตร

            <v-spacer></v-spacer>

            <v-text-field
              clearable
              label="หลักสูตร"
              variant="outlined"
              prepend-inner-icon="mdi-magnify"
              v-model="pageParams.search"
              rounded="lg"
              @keydown.enter="fetchCurriculum"
              style="margin-right: 3%; width: 300px"
            ></v-text-field>

            <v-combobox
              clearable
              label="คณะ"
              @keydown.enter="fetchCurriculum"
              v-model="select.search"
              :items="facultiesOptions"
              variant="outlined"
              rounded="lg"
            ></v-combobox>
            <v-btn
              rounded="lg"
              style="height: 55px; margin-bottom: 2%; margin-left: 1.6%; width: 150px"
              to="/AddIFAAIView"
            >
              <v-icon>mdi-plus</v-icon>&nbsp; ADD NEW</v-btn
            >
          </v-card-title>

          <v-divider class="ma-2"></v-divider>

          <v-data-table-server
            v-model:items-per-page="pageParams.limit"
            :headers="headers"
            :items="curriculumStore.curriculums"
            :items-length="curriculumStore.totalCurriculums"
            :loading="loading"
            item-value="name"
            @update:options="updateOptions"
            class="custom-header"
            rounded="lg"
          >
            <!-- <template v-slot:top>
              <v-text-field
                v-model="pageParams.search"
                label="Search"
                @keydown.enter="fetchCurriculum"
                class="mx-4"
              ></v-text-field>
            </template> -->
            <template v-slot:item="{ item, index }">
              <tr :class="{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }">
                <td>{{ item.id }}</td>
                <td>{{ item.thaiName }}</td>
                <td>{{ item.period }}</td>

                <td>
                  <v-btn variant="text" @click="() => showDialog(item)">
                    <v-icon>mdi-file-document-edit-outline</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table-server>
        </v-card>
      </v-card>
    </div>
  </v-container>
  <DialogAddIF :visible="dialogVisible" :item="selectedItem" @close-dialog="closeDialog" />
</template>
<style scoped>
.details-text {
  margin-left: 10px; /* Adjust the spacing between the div and p as needed */
  font-weight: bold;
  font-size: large;
}

.custom-header {
  background-color: #2b5ec3; /* Blue header color */
  color: #ffffff;
}
.even-row {
  background-color: #f9f9f9;
  color: black;
  text-align: left;
}
.odd-row {
  background-color: #ffffff;
  color: black;
  text-align: left;
}
</style>