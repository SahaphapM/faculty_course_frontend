<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useSkillStore } from '@/stores/skills'

const props = defineProps<{ visible: boolean; item: any | null }>()
const emit = defineEmits(['close-dialog'])
const skillStore = useSkillStore()
const localVisible = ref(props.visible)
const skills = computed(() => skillStore.editedSkill)

watch(
  () => props.visible,
  (newVal) => {
    localVisible.value = newVal
  }
)

function closeDialog() {
  skillStore.clearForm()
  emit('close-dialog')
}

async function saveSkill() {
  let skill = { ...skills.value }
  const payload: { name: string; description: string; domain: string } = {
    name: skill.name,
    description: skill.description,
    domain: skill.domain
  }
  console.log(payload)
  await skillStore.addSkill(payload)
  closeDialog()
}
</script>

<template>
  <v-dialog v-model="localVisible" max-width="1000px" persistent style="overflow-y: auto">
    <v-card class="elevation-5" rounded="lg" width="100%" height="100%" style="min-width: 350px">
      <v-container>
        <v-row>
          <v-col cols="11" class="my-auto">
            <p style="font-size: 20px">Add New Skill</p>
          </v-col>
          <v-col cols="1">
            <div style="display: flex; justify-content: flex-end">
              <v-btn color="primary" variant="plain" @click="closeDialog" icon="mdi-close" /></div
          ></v-col>
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
            <v-combobox
              v-model="skills.domain"
              hide-details
              label="Skill Type"
              :items="['ความรู้', 'คุณลักษณะบุคคล', 'จริยธรรม', 'ทักษะ']"
            ></v-combobox>
          </v-col>
        </v-row>

        <v-row class="justify-end pb-2">
          <v-btn @click="closeDialog" variant="plain" color="error">cancel </v-btn>
          <v-btn @click="saveSkill" variant="plain">save</v-btn>
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
