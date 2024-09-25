<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSkillStore } from '@/stores/skills'
import skillService from '@/service/skills'
import skillDetailDialog from './skillDetailDialog.vue'
const route = useRoute()
const router = useRouter()
const skillStore = useSkillStore()
const children = computed(() => skillStore.skillss)
const dialogVisible = ref(false)
const selectedItem = ref<any | null>(null)
const skills = computed(() => skillStore.editedSkill)
const subSkillInput = ref<any>(null)
const subSkillRemove = ref<any>(null)
async function fetchSkillDetail(id: string) {
  try {
    await skillStore.fetchSkill(id)
  } catch (error) {
    console.error('Failed to fetch skill details:', error)
  }
}

async function saveSkill() {
  console.log(skills.value.children)
  console.log(skills.value.techSkills)
  let skill = { ...skills.value }
  if (skills.value.id != '') {
    skillStore.updateSkill(skill)
  } else {
    const payload: { name: string; description: string; domain: string } = {
      name: skill.name,
      description: skill.description,
      domain: skill.domain
    }
    console.log(payload)
    // skillService.addTechSkill(skills.value.id, skills.value.techSkills)
    await skillStore.addSkill(payload)
  }
  router.push({ name: 'SkillView'})
}

const closeDialog = async () => {
  dialogVisible.value = false
}

onMounted(() => {
  if (route.params.id !== 'addNew') {
    console.log('update')
    fetchSkillDetail(route.params.id as string)
  } else {
    console.log('add')
    skillStore.clearForm()
  }
})
</script>

<template>
  <v-container>
    <v-breadcrumbs :items="['หน้าหลัก', 'หลักสูตร', 'สกิล']">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <p style="font-size: 30px">รายละเอียดสกิล</p>

    <v-card
      class="elevation-5"
      rounded="lg"
      max-width="1000px"
      width="100%"
      height="100%"
      style="min-width: 200px"
    >
      <v-container style="width: 100%; height: 100%">
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

        <v-row>
          <v-col>
            <v-btn @click="saveSkill">Save</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
  <skillDetailDialog :visible="dialogVisible" :item="selectedItem" @close-dialog="closeDialog()" />
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
