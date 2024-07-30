<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from 'vue'
import http from '@/service/http'
import { useCurriculumStore } from '@/stores/curriculums'
import type { Curriculum } from '@/types/Curriculums'
import { useUserStore } from '@/stores/user'
import type { Branch } from '@/types/Branch'
import { useBranchStore } from '@/stores/branch'
import type {} from '@/types/Faculty'
import type { VForm } from 'vuetify/components'
import { usePloStore } from '@/stores/plos'

const curriculumStore = useCurriculumStore()
const branchStore = useBranchStore()
const PloStore = usePloStore()
const userStore = useUserStore()
const curriculums = computed(() => curriculumStore.curriculums)
const overlay = ref(false)
const reveal = ref(false)
const reveal2 = ref(true)
const reveal3 = ref(false)
const users = computed(() => userStore.users)
const id = ref<string>('')
const thaiName = ref<string>('')
const engName = ref<string>('')
const thaiDegreeName = ref<string>('')
const engDegreeName = ref<string>('')
const description = ref<string>('')
const resultTypes = ref<string>('')
const nameRules = [(v: string) => !!v || 'Please check complete information']
const select1 = ref<string | null>(null)
const select2 = ref<any | null>(null)
const branches = computed(() => branchStore.branches)
const select3 = ref<any | null>(null)
const select4 = ref<any | null>(null)
const select5 = ref<string | null>(null)
const items1 = ref<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4'])
const items2 = ref<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4'])
const items4 = ref<string[]>(['ความรู้', 'ทักษะ', 'จริยธรรม', 'ลักษณะบุคคล'])
const items3 = ref<string[]>(['นาย', 'นางสาว', 'นางสาว'])
const form = ref<VForm | null>(null)

onMounted(async () => {
  await branchStore.getBranches()
  curriculumStore.fetchCurriculums()
  await userStore.fetchUsers()
  const coordinators = curriculumStore.currentCurriculum?.coordinators
})

const props = defineProps<{ visible: boolean; item: any | null }>()
const emit = defineEmits(['close-dialog'])

const localVisible = ref(props.visible)

watch(
  () => props.visible,
  (newVal) => {
    localVisible.value = newVal
  }
)
const isMobile = computed(() => window.innerWidth <= 600)

const closeDialog = () => {
  emit('close-dialog')
}

watch(overlay, (val) => {
  if (val) {
    setTimeout(() => {
      overlay.value = false
    }, 2000)
  }
})

watch(select4, (newValue) => {
  if (newValue) {
    const selectedCurriculum = curriculums.value.find(
      (curriculum) => curriculum.thaiName === newValue
    )
    if (selectedCurriculum) {
      console.log(selectedCurriculum.id)
      id.value = selectedCurriculum.id
    }
  }
})

async function deleteItem() {
  if (curriculumStore.currentCurriculum) {
    await curriculumStore.deleteCurriculum(curriculumStore.currentCurriculum.id)
    // editedIndex = -1
  } else {
    // Handle the case where currentCurriculum is null
    console.error('No curriculum selected for deletion')
  }
}
// watch(
//   () => curriculumStore.currentCurriculum,
//   (newCurriculum) => {
//     coordinators.value = newCurriculum?.coordinators
//   }
// )
const tab = ref<string>('option-1')
watch(
  () => curriculumStore.currentCurriculum,
  (newCurriculum) => {
    if (newCurriculum) {
      id.value = newCurriculum.id
      thaiName.value = newCurriculum.thaiName
      engName.value = newCurriculum.engName
      select1.value = newCurriculum.thaiDegreeName
      engDegreeName.value = newCurriculum.engDegreeName
      select2.value = `${(newCurriculum.branch as any).id} ${(newCurriculum.branch as any).name}`

      console.log(newCurriculum)
    } else {
      id.value = ''
      thaiName.value = ''
      engName.value = ''
      thaiDegreeName.value = ''
      engDegreeName.value = ''
      select2.value = ''
    }
  },
  { immediate: true }
)

const userOptions = computed(() => {
  return users.value.map((user) => {
    const rolesString = Array.isArray(user.roles)
      ? user.roles.map((role) => role.name).join(', ')
      : 'No Roles'
    return `${user.id} ${user.firstName} ${user.lastName}`
  })
})

const branchOptions = computed(() => {
  return branches.value.map((branch) => {
    return `${branch.id} ${branch.name}`
  })
})

const validate = async () => {
  reveal.value = true

  reveal2.value = false
  reveal3.value = false
}

const validate2 = async () => {
  setTimeout(() => {
    reveal2.value = true
  }, 300)
  reveal.value = false
  reveal3.value = false
}

const validate3 = async () => {
  setTimeout(() => {
    reveal3.value = true
  }, 300)
  reveal2.value = false
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
  curriculumStore.editedCurriculum.thaiDegreeName = select1.value ?? ''
  curriculumStore.editedCurriculum.engDegreeName = engDegreeName.value
  curriculumStore.editedCurriculum.description = ''
  curriculumStore.editedCurriculum.period = 4
  curriculumStore.editedCurriculum.branch = select2.value.substring(0, select2.value.indexOf(' '))
  curriculumStore.editedCurriculum.minimumGrade = 0
  overlay.value = !overlay.value
  await curriculumStore.saveCurriculum()
}

async function save2() {
  const { valid } = await form.value!.validate()
  if (!valid) return
  // PloStore.editedPlo.id = id.value
  PloStore.editedPlo.description = description.value
  PloStore.editedPlo.resultTypes = select5.value
  overlay.value = !overlay.value
  await curriculumStore.saveCurriculum()
}

async function saveC() {
  const { valid } = await form.value!.validate()
  if (!valid) return
  const userId = select3.value.substring(0, select3.value.indexOf(' '))
  console.log(userId)
  if (!userId) {
    return
  }

  curriculumStore.editedCurriculum.id = id.value
  overlay.value = !overlay.value
  await curriculumStore.currentCurriculum
  await curriculumStore.addCoordinatorToCurriculum(curriculumStore.editedCurriculum.id, userId)
}
</script>
<template>
  <v-dialog max-width="1000px" v-model="localVisible" persistent>
    <v-card
      class="elevation-5"
      rounded="lg"
      max-width="1000px"
      width="100%"
      height="100%"
      min-height="82vh"
      style="min-width: 40vh"
      v-if="reveal2"
    >
      <v-container style="width: 100%">
        <div style="display: flex; justify-content: flex-end">
          <v-btn
            color="primary"
            variant="text"
            @click="closeDialog"
            style="height: auto"
            class="circular-btn"
            icon="mdi-close"
          >
          </v-btn>
        </div>
      </v-container>
      <v-tabs-window v-model="tab">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <div :class="{ 'd-flex flex-row': true, 'mobile-tabs': true }">
                <v-tabs
                  v-model="tab"
                  color="primary"
                  :direction="isMobile ? 'horizontal' : 'vertical'"
                >
                  <v-tab
                    max-width="30vh"
                    prepend-icon="mdi-book"
                    text="รายละเอียด"
                    value="option-1"
                    width="31vh"
                  ></v-tab>
                  <v-tab
                    max-width="30vh"
                    prepend-icon="mdi-account"
                    text="อาจารย์ผู้รับผิดชอบหลักสูตร"
                    value="option-2"
                  ></v-tab>
                  <v-tab
                    max-width="30vh"
                    prepend-icon="mdi-human-male-board"
                    text="ผลการเรียนรู้ที่คาดหวังของหลักสูตร"
                    value="option-3"
                  ></v-tab>
                </v-tabs>
              </div>
            </v-col>

            <v-col cols="12" md="8">
              <v-tabs-window v-model="tab">
                <v-tabs-window-item value="option-1">
                  <div style="display: flex; align-items: center; margin-bottom: 5vh">
                    <div style="flex-grow: 1; display: flex; align-items: center">
                      <div class="rounded-rectangle"></div>
                      <p class="details-text" style="font-size: 2.5vh; margin-left: 1vh">
                        รายละเอียด
                      </p>
                    </div>
                  </div>
                  <div>
                    <v-form ref="form" class="form-container">
                      <v-sheet width="90%" min-height="20vh" max-height="80vh" height="100%">
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
                        <v-text-field
                          v-model="select1"
                          :rules="nameRules"
                          variant="outlined"
                          rounded="lg"
                        ></v-text-field>
                        <p style="font-size: 1.5vh">ชื่อปริญญา ( อังกฤษ)</p>
                        <v-text-field
                          v-model="engDegreeName"
                          :rules="nameRules"
                          variant="outlined"
                          rounded="lg"
                        ></v-text-field>
                        <p style="font-size: 1.5vh">สาขาวิชา</p>
                        <v-select
                          v-model="select2"
                          :items="branchOptions"
                          variant="outlined"
                          rounded="lg"
                        ></v-select>
                        <v-overlay :model-value="overlay" class="align-center justify-center">
                          <v-progress-circular
                            color="red"
                            size="64"
                            indeterminate
                          ></v-progress-circular>
                        </v-overlay>
                        <v-row class="justify-end">
                          <v-btn @click="reset" variant="plain" color="error">ล้าง</v-btn>
                          <v-btn @click="save" variant="plain">บันทึก</v-btn>
                        </v-row>
                      </v-sheet>
                    </v-form>
                  </div>
                </v-tabs-window-item>

                <v-tabs-window-item value="option-2">
                  <div style="display: flex; align-items: center; margin-bottom: 5vh">
                    <div style="flex-grow: 1; display: flex; align-items: center">
                      <div class="rounded-rectangle"></div>
                      <p class="details-text" style="font-size: 2.5vh; margin-left: 1vh">
                        อาจารย์ผู้รับผิดชอบหลักสูตร
                      </p>
                    </div>
                  </div>
                  <div height="80vh">
                    <v-form ref="form" class="ma-2">
                      <p style="font-size: 1.5vh">เลือก</p>
                      <v-combobox
                        clearable
                        v-model="select3"
                        :items="userOptions"
                        variant="outlined"
                        rounded="lg"
                      ></v-combobox>
                      <p style="font-size: 1.5vh">รายชื่อ</p>
                      <v-card
                        style="border-color: #bdbdbd"
                        variant="outlined"
                        rounded="lg"
                        v-for="(curriculum, index) in curriculumStore.currentCurriculum
                          ?.coordinators"
                        :key="curriculum.id"
                        class="pa-3 mt-3"
                      >
                        <v-row>
                          <v-col>
                            <v-icon color="primary"> mdi-numeric-{{ index + 1 }}-circle</v-icon
                            >&nbsp; {{ curriculum.id }}&nbsp; {{ curriculum.firstName }}&nbsp;
                            {{ curriculum.lastName }}
                          </v-col>
                          <v-col class="d-flex justify-end" cols="auto">
                            <v-btn
                              color="red"
                              variant="text"
                              @click="closeDialog"
                              style="height: auto"
                              class="circular-btn"
                              icon="mdi-minus"
                            >
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card>

                      <v-overlay :model-value="overlay" class="align-center justify-center">
                        <v-progress-circular
                          color="primary"
                          size="64"
                          indeterminate
                        ></v-progress-circular>
                      </v-overlay>
                      <v-row class="justify-center">
                        <v-btn
                          icon="mdi-plus"
                          class="ma-4 rounded-circle mt-9"
                          size="40px"
                          variant="outlined"
                          @click="saveC"
                        ></v-btn>
                      </v-row>
                      &nbsp;
                      <v-row class="justify-end mt-8">
                        <v-btn @click="reset" variant="plain" color="error">ล้าง</v-btn
                        ><v-btn @click="saveC" variant="plain">บันทึก</v-btn></v-row
                      >
                    </v-form>
                  </div>
                </v-tabs-window-item>
              </v-tabs-window>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window>
    </v-card>
  </v-dialog>
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
.circular-btn {
  width: 40px; /* Adjust width as needed */
  height: 40px; /* Adjust height as needed */
  border-radius: 50%; /* Makes the button circular */
  min-width: 0; /* Remove default min-width */
  display: flex; /* Center content */
  align-items: center; /* Center content vertically */
  justify-content: center; /* Center content horizontally */
}
.form-container {
  overflow-y: auto;
  height: 100%;
}
</style>