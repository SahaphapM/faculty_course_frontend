<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import skillService from '@/service/skills'
import { useSkillStore } from '@/stores/skills'

const props = defineProps<{ visible: boolean; item: any | null }>()
const emit = defineEmits(['close-dialog'])
const skillStore = useSkillStore()

const skills = computed(() => skillStore.editedSkill)
const children = computed(() => skillStore.skillss)
const techSkillInput = ref<any>(null)
const subSkillInput = ref<any>(null)
const localVisible = ref(props.visible)
watch(
  () => props.visible,
  (newVal) => {
    localVisible.value = newVal
  }
)

const closeDialog = async () => {
  emit('close-dialog')
}

async function saveSkill() {
  console.log(skills.value.id, skills.value.children)
  const childrens = skills.value.children.map((child: any) => ({ id: child.id }))
  console.log(childrens)
  await skillService.addSubSkill(skills.value.id, childrens as [])

  closeDialog()
}

function getAllChildrenIds(skill: any): string[] {
  const ids = [];
  if (skill.children) {
    for (const child of skill.children) {
      ids.push(child.id);
      ids.push(...getAllChildrenIds(child)); // Recursively gather IDs of children and grandchildren
    }
  }
  return ids;
}

function filterAvailableSkills() {
  // Get the ids of all children and grandchildren of the current skill
  const excludedIds = getAllChildrenIds(skills.value);
  excludedIds.push(skills.value.id); // Include the current skill's id to avoid self-reference

  // Filter the skills to exclude those ids
  return children.value.filter((child: any) => !excludedIds.includes(child.id));
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

onMounted(async () => {
  await skillStore.fetchSkills()
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
          <v-col>
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
              :items="filterAvailableSkills()" 
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
