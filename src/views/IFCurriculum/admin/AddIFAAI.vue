<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import http from '@/service/http'
import { useCurriculumStore } from '@/stores/curriculums'
import type { Curriculum } from '@/types/Curriculums'
import curriculumService from '@/service/curriculums'
import type { VForm } from 'vuetify/components'
const curriculumStore = useCurriculumStore()
const overlay = ref(false)
const reveal = ref(false)
const reveal2 = ref(true)
const curriculums = ref(curriculumStore.curriculums)

onMounted(async () => {
  await curriculumStore.fetchCurriculums()
})

watch(overlay, (val) => {
  if (val) {
    setTimeout(() => {
      overlay.value = false
    }, 2000)
  }
})
const id = ref<string>('')
const thaiName = ref<string>('')
const engName = ref<string>('')
const phdName = ref<string>('')
const degreeName = ref<string>('')
const nameRules = [(v: string) => !!v || 'Please check complete information']
const select1 = ref<string | null>(null)
const select2 = ref<string | null>(null)
const select3 = ref<string | null>(null)
const items1 = ref<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4'])
const items2 = ref<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4'])
const items3 = ref<string[]>(['นาย', 'นางสาว', 'นางสาว'])
const form = ref<VForm | null>(null)

const validate = async () => {
  setTimeout(() => {
    reveal.value = true
  }, 300)

  reveal2.value = false
}

const validate2 = async () => {
  setTimeout(() => {
    reveal2.value = true
  }, 300)
  reveal.value = false
}

const reset = () => {
  form.value!.reset()
}

const resetValidation = () => {
  form.value!.resetValidation()
}

async function save() {
  const { valid } = await form.value!.validate()
  if (!valid) return
  curriculumStore.editedCurriculum.thaiName = thaiName.value
  curriculumStore.editedCurriculum.engName = engName.value
  curriculumStore.editedCurriculum.id = id.value
  curriculumStore.editedCurriculum.phdName = select1.value
  curriculumStore.editedCurriculum.degreeName = degreeName.value
  curriculumStore.editedCurriculum.objective = select2.value
  curriculumStore.editedCurriculum.period = 4
  curriculumStore.editedCurriculum.minimumGrade = 0
  overlay.value = !overlay.value
  await curriculumStore.saveCurriculum()
}
</script>
<template>
  <div class="pa-4 bg-grey-lighten-4">
    <v-breadcrumbs :items="['หน้าหลัก', 'หลักสูตร', 'วิทยาการสารสนเทศ']">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <p style="font-size: x-large; margin-left: 3vh; color: #424242; margin-top: 3vh">
      เพิ่มหลักสูตร
    </p>
    <v-container class="d-flex" style="max-width: 700px">
      <v-expand-transition name="fade">
        <v-card
          class="elevation-5"
          rounded="lg"
          max-width="700px"
          width="700px"
          style="min-width: 40vh"
          v-if="reveal2"
        >
          <v-container>
            <div style="display: flex; margin-bottom: 5vh; margin-top: 2vh">
              <div class="rounded-rectangle"></div>
              <p class="details-text" style="font-size: 2.5vh">รายละเอียด</p>
            </div>

            <v-form ref="form" class="ma-2">
              <p style="font-size: 1.5vh">ชื่อหลักสูตร</p>
              <v-text-field
                v-model="thaiName"
                :rules="nameRules"
                variant="outlined"
                rounded="lg"
                class="small-input"
              ></v-text-field>
              <p style="font-size: 1.5vh">ชื่อหลักสูตร (อังกฤษ)</p>
              <v-text-field
                v-model="engName"
                :rules="nameRules"
                variant="outlined"
                rounded="lg"
              ></v-text-field>
              <p style="font-size: 1.5vh">รหัสหลักสูตร</p>
              <v-text-field
                v-model="id"
                :rules="nameRules"
                variant="outlined"
                rounded="lg"
              ></v-text-field>
              <p style="font-size: 1.5vh">ชื่อปริญญา</p>
              <v-select
                v-model="select1"
                :items="items1"
                variant="outlined"
                rounded="lg"
              ></v-select>
              <p style="font-size: 1.5vh">ชื่อปริญญา ( อังกฤษ)</p>
              <v-text-field
                v-model="degreeName"
                :rules="nameRules"
                variant="outlined"
                rounded="lg"
              ></v-text-field>
              <p style="font-size: 1.5vh">สาขาวิชา</p>
              <v-select
                v-model="select2"
                :items="items2"
                variant="outlined"
                rounded="lg"
              ></v-select>
              <v-overlay :model-value="overlay" class="align-center justify-center">
                <v-progress-circular color="red" size="64" indeterminate></v-progress-circular>
              </v-overlay>
              <v-row class="justify-end">
                <v-btn @click="reset" variant="plain" color="error">ล้าง</v-btn
                ><v-btn @click="save" variant="plain">บันทึก</v-btn></v-row
              >
            </v-form>
          </v-container>
        </v-card>
      </v-expand-transition>

      <v-expand-transition>
        <v-card
          class="elevation-5"
          rounded="lg"
          max-width="700px"
          width="700px"
          style="min-width: 40vh"
          v-if="reveal"
        >
          <v-container>
            <div style="display: flex; margin-bottom: 5vh; margin-top: 2vh">
              <div class="rounded-rectangle"></div>
              <p class="details-text" style="font-size: 2.5vh">อาจารย์ผู้รับผิดชอบหลักสูตร</p>
            </div>
            <v-form ref="form" class="ma-2">
              <p style="font-size: 1.5vh">คำนำหน้า</p>
              <v-select
                v-model="select3"
                :items="items3"
                variant="outlined"
                rounded="lg"
              ></v-select>
              <p style="font-size: 1.5vh">ชื่อ</p>
              <v-text-field :rules="nameRules" variant="outlined" rounded="lg"></v-text-field>
              <p style="font-size: 1.5vh">นามสกุล</p>
              <v-text-field :rules="nameRules" variant="outlined" rounded="lg"></v-text-field>
              <p style="font-size: 1.5vh">ตำแหน่งทางวิชาการ</p>
              <v-text-field :rules="nameRules" variant="outlined" rounded="lg"></v-text-field>

              <v-overlay :model-value="overlay" class="align-center justify-center">
                <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
              </v-overlay>
              <v-row class="justify-center">
                <v-btn
                  icon="mdi-plus"
                  class="ma-4 rounded-circle"
                  size="40px"
                  variant="outlined"
                ></v-btn>
              </v-row>
              <v-row class="justify-end mt-8">
                <v-btn @click="reset" variant="plain" color="error">ล้าง</v-btn
                ><v-btn @click="save" variant="plain">บันทึก</v-btn></v-row
              >
            </v-form>
          </v-container>
        </v-card>
      </v-expand-transition>
    </v-container>
    <v-container class="d-flex" style="max-width: 700px">
      <v-card
        class="elevation-5"
        rounded="lg"
        max-width="700px"
        width="700px"
        style="min-width: 40vh"
      >
        <p class="font-weight-black ma-5" style="font-size: large">
          <v-icon left size="xx-small" class="mr-2" color="#112f69">mdi-circle</v-icon
          >เนื้อหาหลักสูตร
        </p>
        <v-card-actions v-if="!reveal2" @click="validate2">
          <p class="font-weight-black ma-2" style="font-size: small">รายละเอียด</p>
          <v-spacer></v-spacer>
        </v-card-actions>

        <v-card-actions v-if="!reveal" @click="validate">
          <p class="font-weight-black ma-2" style="font-size: small">อาจารย์ผู้รับผิดชอบหลักสูตร</p>
          <v-spacer></v-spacer>
        </v-card-actions>

        <v-card-actions>
          <p class="font-weight-black ma-2" style="font-size: small">
            ผลการเรียนรู้ที่คาดหวังของหลักสูตร
          </p>
          <v-spacer></v-spacer>
        </v-card-actions>

        <v-card-actions>
          <p class="font-weight-black ma-2" style="font-size: small">การจัดกระบวนการเรียนรู้</p>
          <v-spacer></v-spacer>
        </v-card-actions>

        <v-card-actions>
          <p class="font-weight-black ma-2" style="font-size: small">
            โครงสร้างหลักสูตร รายวิชาและหน่วยกิต
          </p>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.rounded-rectangle {
  width: 1vh; /* Adjust the width as needed */
  height: 3.5vh; /* Adjust the height as needed */
  background-color: #392fc5; /* Background color of the rectangle */
  border-top-left-radius: 50px; /* Adjust the radius as needed */
  border-top-right-radius: 50px; /* Adjust the radius as needed */
  border-bottom-left-radius: 50px; /* Adjust the radius as needed */
  border-bottom-right-radius: 50px; /* Adjust the radius as needed */
}
.details-text {
  margin-left: 10px; /* Adjust the spacing between the div and p as needed */
  font-weight: bold;
  font-size: large;
}
</style>
