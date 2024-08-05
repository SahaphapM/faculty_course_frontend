<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSkillStore } from '@/stores/skills'
import { useSubjectStore } from '@/stores/subject'

const route = useRoute()
const router = useRouter()
const props = defineProps<{ visible: boolean; item: any | null }>()
const emit = defineEmits(['close-dialog'])
const skillStore = useSkillStore()
const subjectStore = useSubjectStore()
const skills = computed(() => skillStore.editedSkill)
const subjects = computed(() => subjectStore.subjects)
const selectSubjects = ref<any | null>(null)
const localVisible = ref(props.visible)

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
  if (skills.value.id != '') {
    skillStore.updateSkill(skill)
    closeDialog()
  } else {
    skill.subjects = selectSubjects.value
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
          <v-col cols="12">
            <!-- <v-text-field
              v-model="skills.subjects"
              :counter="10"
              label="Colors Tag"
              hide-details
              required
            ></v-text-field> -->
            <v-select
              v-model="selectSubjects"
              :return-object="true"
              :items="subjects"
              multiple
              item-title="description"
              item-value="id"
              variant="outlined"
            ></v-select>
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
