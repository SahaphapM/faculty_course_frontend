<template>
  <v-container fluid>
    <h2 class="mb-5">
      <v-icon icon="mdi-book" class="mr-2"></v-icon>
      Course
    </h2>
    <div class="d-flex justify-between ga-5">
      <v-text-field height="1000" label="Search" hide-details prepend-inner-icon="mdi-magnify">
      </v-text-field>
      <v-btn flat>
        add
        <v-dialog activator="parent">
          <template #default="{ isActive }">
            <v-card class="mx-auto w-100" style="max-width: 700px">
              <v-card-title>New Course</v-card-title>
              <v-card-text>
                <v-text-field label="Name" v-model="form.name"></v-text-field>
                <v-text-field label="Description" v-model="form.description"></v-text-field>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn @click="isActive.value = false">close</v-btn>
                <v-btn color="success" @click="addCourse()">save</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-btn>
    </div>
    <v-card class="mt-5" v-if="courses">
      <v-card-title>Course Name</v-card-title>
      <v-card-text class="">
        <p>Description</p>
        <v-expansion-panels class="mt-5" flat>
          <v-expansion-panel>
            <v-expansion-panel-title>
              <h4>Enrolled Students</h4>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list>
                <span v-if="students">
                  <v-list-item v-for="s in students" :key="s.id"> </v-list-item>
                </span>
                <span v-else> No Students </span>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn prepend-icon="mdi-pencil">edit</v-btn>
      </v-card-actions>
    </v-card>
    <div class="mt-5" v-else>
      <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { CourseService } from '@/service/course'
import type { Course } from '@/types/Course'
import type { Student } from '@/types/Student'
import { computed, onMounted, reactive, ref } from 'vue'

const loading = computed(() => {
  if (courses.value) {
    return false
  }
  return true
})
const courses = ref<Course[]>()
const students = ref<Student[]>()
const form = reactive({
  name: '',
  description: ''
})

const fetchCourse = () => {
  CourseService.getCourses().then((res) => {
    courses.value = res.data
  })
}

// const fetchStudents = () => {
//   CourseService.getStudents().then((res) => {
//     students.value = res.data
//   })
// }

const resetForm = () => {
  form.name = ''
  form.description = ''
}

const addCourse = () => {
  CourseService.addCourse({
    name: form.name,
    description: form.description
  })
  resetForm()
}

onMounted(() => {
  fetchCourse()
})
</script>
