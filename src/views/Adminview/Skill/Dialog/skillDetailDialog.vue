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
  async (newVal) => {
    localVisible.value = newVal
    try {
      await skillStore.fetchSkill(props.item.id)
    } catch (error) {
      console.error('Error fetching skills:', error)
    }
  }
)

function closeDialog() {
  skillStore.clearForm()
  emit('close-dialog')
}

async function saveSkill() {
  let skill = { ...skills.value }
  await skillStore.updateSkill(skill)
  closeDialog()
}
</script>

<template>
  <v-dialog
    v-model="localVisible"
    max-width="1000px"
    persistent
    style="height: 100vh; overflow-y: auto"
  >
    <v-card class="elevation-5" rounded="lg" width="100%" height="100%" style="min-width: 200px">
      <v-container style="width: 100%; height: 100%">
        <v-row>
          <v-col cols="11" class="my-auto">
            <p style="font-size: 24px">Detail</p>
          </v-col>
          <v-col cols="1"
            ><div style="display: flex; justify-content: flex-end">
              <v-btn
                color="primary"
                variant="plain"
                @click="closeDialog"
                style="height: 40px; width: 40px"
                class="circular-btn"
                icon="mdi-close"
                rounded="lg"
              /></div
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

          <!-- <v-col cols="10"><p>Sub Skills</p></v-col
          ><v-col cols="2"><v-btn @click="showDialog">Edit Sub Skills</v-btn></v-col>

          <v-col cols="12">
            <v-treeview
              :items="skills.children"
              item-key="id"
              item-title="name"
              activatable
              open-on-click
            >
            </v-treeview>
          </v-col> -->

          <!-- <v-col cols="12">
            <v-combobox
              v-model="subSkillInput"
              hide-details
              label="Sub Skill"
              item-title="name"
              :items="children"
            ></v-combobox>
            <v-btn @click="addSubSkill" class="mt-4">Add Tech Skill</v-btn>
          </v-col> -->
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
