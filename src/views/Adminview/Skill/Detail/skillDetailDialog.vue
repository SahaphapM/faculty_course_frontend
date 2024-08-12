<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSkillStore } from '@/stores/skills'
import { useSubjectStore } from '@/stores/subject'
import type { VForm } from 'vuetify/components'
const props = defineProps<{ visible: boolean; item: any | null }>()
const emit = defineEmits(['close-dialog'])
const skillStore = useSkillStore()
const subjectStore = useSubjectStore()
const skills = computed(() => skillStore.editedSkill)
const subSkills = computed(() => skillStore.skills)
const selectSkill = ref<any | null>(null)
const form = ref<VForm | null>(null)
type skillIds = { id: string }
const coordinator = ref<skillIds[]>([])
const localVisible = ref(props.visible)
const overlay = ref(false)
watch(
  () => props.visible,
  (newVal) => {
    localVisible.value = newVal
  }
)

async function fetchSkillDetail(id: string) {
  try {
    await skillStore.fetchSkill(id)
  } catch (error) {
    console.error('Failed to fetch skill details:', error)
  }
}

const closeDialog = async () => {
  emit('close-dialog')
  // await skillStore.fetchSkills()
  // skillStore.clearForm()
}

function saveSkill() {
  let skill = { ...skills.value }
  skill.techSkills = selectSkill.value
  if (skills.value.id != '') {
    skillStore.updateSkill(skill)
    closeDialog()
  } else {
    const payload: { name: string; description: string; subjects: Object[] } = {
      name: skill.name,
      description: skill.description,
      subjects: skill.subjects
    }
    console.log(payload)

    skillStore.addSkill(payload)
    closeDialog()
  }
}
function removeCoordinator(id: string) {
  coordinator.value = coordinator.value.filter((coord) => coord.id !== id)
}
async function addc() {
  const { valid } = await form.value!.validate()
  if (!valid) return

  // Assuming selectSkill.value is an array of selected subjects
  if (Array.isArray(selectSkill.value)) {
    for (const subject of selectSkill.value) {
      const skillId = subject.id

      if (skillId) {
        if (!coordinator.value) {
          coordinator.value = []
        }

        // Avoid duplicates
        const exists = coordinator.value.some((coord) => coord.id === skillId)
        if (!exists) {
          coordinator.value.push({ id: skillId })
          console.log(coordinator)
        }
      }
    }
  }
  console.log(selectSkill.value)
}

const getUserInfoById = (id: any) => {
  const skillString = selectSkill.value.find((skillString: string) =>
    skillString.startsWith(`${id} `)
  )
  return skillString ? skillString : 'User Not Found'
}

onMounted(() => {
  subjectStore.fetchAllSubjects()
})
</script>

<template>
  <v-dialog
    v-model="localVisible"
    max-width="1000px"
    persistent
    style="height: 100vh; overflow-y: auto"
  >
    <v-card
      class="elevation-5"
      rounded="lg"
      max-width="1000px"
      width="100%"
      height="100%"
      style="min-width: 200px"
    >
      <v-container style="width: 100%; height: 100%">
        <div style="display: flex; justify-content: flex-end">
          <v-btn
            color="primary"
            variant="plain"
            @click="closeDialog"
            style="height: 40px; width: 40px"
            class="circular-btn"
            icon="mdi-close"
            rounded="lg"
          />
        </div>
        <p style="font-size: 30px">รายละเอียดสกิล</p>

        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="skills.name"
              :counter="10"
              label="Name"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="skills.description"
              :counter="10"
              label="Description"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12"
            ><v-combobox
              v-model="skills.level"
              hide-details
              label="Level"
              :items="[1, 2, 3, 4, 5]"
            ></v-combobox
          ></v-col>
          <v-col cols="12">
            <v-row class="my-1">
              <p style="font-size: 20px; margin-left: 10px; font-weight: bold">Sub Skill</p>
            </v-row>
            <div>
              <v-form ref="form" class="form-container">
                <v-sheet
                  width="100%"
                  min-height="20vh"
                  max-height="50vh"
                  height="60vh"
                  class="pa-6"
                >
                  <p style="font-size: 1.5vh">Choose</p>
                  <v-combobox
                    v-model="selectSkill"
                    :items="subSkills"
                    item-title="name"
                    variant="outlined"
                    rounded="lg"
                  ></v-combobox>

                  <v-card
                    style="border-color: #bdbdbd"
                    variant="outlined"
                    rounded="lg"
                    v-for="(subSkill, index) in coordinator"
                    :key="subSkill.id || index"
                    class="pa-3 mt-3 bg-blue-grey-lighten-5"
                  >
                    <v-row>
                      <v-col>
                        <v-icon color="primary">mdi-numeric-{{ index + 1 }}-circle</v-icon>&nbsp;
                        {{ getUserInfoById(subSkill.id) }}
                      </v-col>
                      <v-col class="d-flex justify-end" cols="auto">
                        <v-btn
                          color="red"
                          variant="text"
                          style="height: auto"
                          class="circular-btn"
                          icon="mdi-minus"
                          @click="removeCoordinator(subSkill.id)"
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
                      class="ma-8 rounded-circle"
                      size="40px"
                      variant="outlined"
                      @click="addc"
                    ></v-btn>
                  </v-row>
                </v-sheet>
              </v-form>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="saveSkill">Save</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
