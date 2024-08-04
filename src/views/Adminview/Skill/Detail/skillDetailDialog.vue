<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSkillStore } from '@/stores/skills'

const route = useRoute()
const router = useRouter()
const props = defineProps<{ visible: boolean; item: any | null }>()
const emit = defineEmits(['close-dialog'])
const skillStore = useSkillStore()
const skills = computed(() => skillStore.editedSkill)
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
  if (route.params.id !== 'addSkill') {
    skillStore.updateSkill(skill)
    closeDialog()
  } else {
    const payload: { name: string; description: string; colorsTag: string } = {
      name: skill.name,
      description: skill.description,
      colorsTag: skill.colorsTag
    }
    skillStore.addSkill(payload)
    closeDialog()
  }
}

onMounted(() => {
  if (!route.params.id) return
  // if (route.params.id !== 'addSkill') {
  //   fetchSkillDetail(route.params.id as string)
  // }
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
            <v-text-field
              v-model="skills.colorsTag"
              :counter="10"
              label="Colors Tag"
              hide-details
              required
            ></v-text-field>
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
