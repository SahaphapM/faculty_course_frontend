<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useSkillStore } from '@/stores/skills'
const skillStore = useSkillStore()
const skills = computed(() => skillStore.skills)
const select = ref<string | null>(null)
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
onMounted(() => {
  skillStore.fetchSkills()
  console.log(skillStore.skills)
})
const filteredSkills = computed(() => {
  if (select.value) {
    return skills.value.filter((skill) => skill.name === select.value)
  } else {
    return skills.value
  }
})
</script>
<template>
  <v-breadcrumbs :items="['หน้าหลัก', 'หลักสูตร', 'สกิล']">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
  <p style="font-size: xx-large; margin-left: 3%">สกิล</p>

  <v-card class="ma-5">
    <v-card-actions>
      <p class="font-weight-black ma-2" style="font-size: small">เล่มหลักสูตร</p>
      <v-select
        v-model="select"
        :items="skills.map((skill) => skill.name)"
        variant="outlined"
        rounded="lg"
      ></v-select>
    </v-card-actions>
  </v-card>

  <v-card class="ma-5">
    <p class="font-weight-black ma-5" style="font-size: large">
      <v-icon left size="xx-small" class="mr-2" color="#112f69">mdi-circle</v-icon>เนื้อหาหลักสูตร
    </p>
    <v-card-actions>
      <p class="font-weight-black ma-2" style="font-size: small">รายละเอียด</p>
      <v-spacer></v-spacer>

      <v-btn :icon="show1 ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show1 = !show1"></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show1">
        <v-divider></v-divider>

        <v-card-text>
          <v-list>
            <v-list-item v-for="skill in filteredSkills" :key="skill.id">
              <v-list-item-content>
                <v-list-item-title>{{ skill.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list></v-card-text
        >
      </div>
    </v-expand-transition>
    <v-card-actions>
      <p class="font-weight-black ma-2" style="font-size: small">อาจารย์ผู้รับผิดชอบหลักสูตร</p>
      <v-spacer></v-spacer>

      <v-btn :icon="show2 ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show2 = !show2"></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show2">
        <v-divider></v-divider>

        <v-card-text>
          <v-list>
            <v-list-item v-for="skill in filteredSkills" :key="skill.id">
              <v-list-item-content>
                <v-list-item-title>{{ skill.description }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list></v-card-text
        >
      </div>
    </v-expand-transition>
    <v-card-actions>
      <p class="font-weight-black ma-2" style="font-size: small">
        ผลการเรียนรู้ที่คาดหวังของหลักสูตร
      </p>
      <v-spacer></v-spacer>

      <v-btn :icon="show3 ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show3 = !show3"></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show3">
        <v-divider></v-divider>

        <v-card-text> 3 </v-card-text>
      </div>
    </v-expand-transition>
    <v-card-actions>
      <p class="font-weight-black ma-2" style="font-size: small">การจัดกระบวนการเรียนรู้</p>
      <v-spacer></v-spacer>

      <v-btn :icon="show4 ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show4 = !show4"></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show4">
        <v-divider></v-divider>

        <v-card-text> 4 </v-card-text>
      </div>
    </v-expand-transition>
    <v-card-actions>
      <p class="font-weight-black ma-2" style="font-size: small">
        โครงสร้างหลักสูตร รายวิชาและหน่วยกิต
      </p>
      <v-spacer></v-spacer>

      <v-btn :icon="show5 ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show5 = !show5"></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show5">
        <v-divider></v-divider>

        <v-card-text> 5 </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
