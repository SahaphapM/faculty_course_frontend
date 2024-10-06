<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import skillService from '@/service/skills'
import { useSkillStore } from '@/stores/skills'

const props = defineProps<{ visible: boolean; item: any | null }>()
const emit = defineEmits(['close-dialog'])
const skillStore = useSkillStore()

const skills = computed(() => skillStore.editedSkill)
const children = computed(() => skillStore.skillss)
const subSkillInput = ref<any>(null)
const localVisible = ref(props.visible)
watch(
  () => props.visible,
  (newVal) => {
    localVisible.value = newVal
    skillStore.fetchSkill(props.item.id)
  }
)

function closeDialog() {
  skillStore.clearForm()
  emit('close-dialog')
}

async function saveSkill() {
  console.log(skills.value.id, skills.value.children)

  const childrens = skills.value.children.map((child: any) => ({ id: child.id }))

  console.log(childrens)

  await skillService.addSubSkill(skills.value.id, childrens as [])

  closeDialog()
}

function addSubSkill() {
  if (!skills.value.children) {
    skills.value.children = []
  }

  if (subSkillInput.value && !skills.value.children.includes(subSkillInput.value)) {
    skills.value.children.push(subSkillInput.value)
    subSkillInput.value = '' // Clear input after adding
    console.log(skills.value.children)
  }
}

function removeSubSkill(subSkillId: string) {
  skills.value.children = skills.value.children.filter((subSkill) => subSkill.id !== subSkillId)
  skillService.removeSubSkill(skills.value.id, subSkillId)
}

// Function to collect all parent skills of the current skill recursively
function getParentChain(skillId: string, skillList: any[]): string[] {
  const skill = skillList.find((s: any) => s.id === skillId)
  if (!skill || !skill.parent) {
    return []
  }

  // Recursively collect the parent and its ancestors
  return [skill.parent, ...getParentChain(skill.parent, skillList)]
}

// Function to filter skills, excluding those in the parent chain
function filterSkills(): any[] {
  if (!skills.value || !skills.value.id) {
    return []
  }

  // Get the parent chain for the current skill
  const parentChain = getParentChain(skills.value.id, children.value)

  // Filter out skills that are in the parent chain
  return children.value.filter(
    (skill: any) => !parentChain.includes(skill.id) && skill.id !== skills.value.id
  )
}

onMounted(async () => {
  await skillStore.fetchSkills()
  console.log(props.item)
  // skillStore.fetchSkill(props.item)
  skillStore.clearForm()
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

        <v-row>
          <v-col cols="12"><p style="font-size: 24px">children</p></v-col>
          <v-col>
            <v-text-field
              v-model="skills.name"
              :counter="10"
              label="Name"
              hide-details
              required
            ></v-text-field
          ></v-col>
          <v-col cols="12">
            <v-treeview :items="skills.children" item-value="id">
              <template v-slot:prepend="{ item }">
                <v-row>
                  <v-col style="margin-top: 12px">{{ item.name }}</v-col>
                  <v-col cols="auto">
                    <v-btn icon @click.stop="removeSubSkill(item.id)">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
            </v-treeview>
          </v-col>

          <v-col cols="12">
            <v-combobox
              v-model="subSkillInput"
              hide-details
              label="Sub Skill"
              item-title="name"
              :items="filterSkills()"
            ></v-combobox>
            <v-btn @click="addSubSkill" class="mt-4">Add Sub Skill</v-btn>
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
