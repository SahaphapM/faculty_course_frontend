<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="pa-5 h-100" flat>
          <template #default>
            <v-row class="d-flex justify-center">
              <v-img
                :src="profile?.picture ?? 'https://placehold.co/200x200'"
                min-width="200"
                min-height="200"
                max-width="200"
                max-height="200"
                class="rounded-circle"
              ></v-img>
            </v-row>
            <div class="mt-6 text-center">
              <p>{{ profile?.name ?? 'placeholder name' }}</p>
              <p>{{ profile?.email ?? 'placeholder@mail.buu' }}</p>
              <p class="mt-3" style="color: green">สถานะ : กำลังศึกษา</p>
            </div>
            <v-card class="mt-5" title="Social Media">
              <template #text>
                <v-list-item
                  v-for="line in socials"
                  :key="line.name"
                  :href="line.link"
                  target="_blank"
                >
                  <template #prepend>
                    <img
                      :src="line.icon"
                      :alt="line.alt"
                      width="48"
                      class="mr-2"
                      draggable="false"
                    />
                  </template>
                  {{ line.name }}</v-list-item
                >
              </template>
            </v-card>
          </template>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card class="pa-7" height="380px" style="border-top: 4px solid #2d487e">
          <div style="display: flex; margin-bottom: 2vh">
            <div class="rounded-rectangle"></div>
            <p class="text-header ml-3" style="font-size: 2.5vh">ระเบียนประวัติ</p>
          </div>

          <p class="text-content mt-1">รหัสประจำตัว : 65160066</p>
          <p class="text-content mt-1">ชื่อ : ชานนท์ ตันสวัสดิ์</p>
          <p class="text-content mt-1">ชื่ออังกฤษ : MR.CHANON THANSAWAD</p>
          <p class="text-content mt-1">คณะ : คณะวิทยาการสารสนเทศ</p>
          <p class="text-content mt-1">วิทยาเขต : บางแสน</p>
          <p class="text-content mt-1">
            หลักสูตร : 2134003 วท.บ. (วิทยาการคอมพิวเตอร์) ปรับปรุง 65 - ป.ตรี 4 ปี ปกติ
          </p>
          <p class="text-content mt-1">ระดับการศึกษา : ปริญญาตรี</p>
          <p class="text-content mt-1">
            ชื่อปริญญา : วิทยาศาสตรบัณฑิต วท.บ. (วิทยาการคอมพิวเตอร์) ปรับปรุง 65 - ป.ตรี 4 ปี ปกติ
          </p>
        </v-card>

        <v-card class="pa-7 mt-2" style="border-top: 4px solid #2d487e">
          <div style="display: flex; align-items: center; margin-bottom: 2vh">
            <div class="rounded-rectangle"></div>
            <p class="text-header ml-3" style="font-size: 2.5vh; margin: 0">ทักษะของผู้เรียน</p>
          </div>

          <div class="d-flex justify-space-between align-center" style="margin-bottom: 1vh">
            <v-icon color="amber-accent-4">mdi-numeric-1-circle</v-icon>
            <p class="text-content" style="margin-left: 1vh">หล่อ</p>
            <p class="text-content" style="margin-left: auto">10000000000/1000000</p>
          </div>

          <v-divider class="mt-2 mb-2"></v-divider>

          <div class="d-flex justify-space-between align-center" style="margin-bottom: 1vh">
            <v-icon color="grey">mdi-numeric-2-circle</v-icon>
            <p class="text-content" style="margin-left: 1vh">web programming</p>
            <p class="text-content" style="margin-left: auto">10/1000000</p>
          </div>

          <v-divider class="mt-2 mb-2"></v-divider>

          <div class="d-flex justify-space-between align-center">
            <v-icon color="brown-darken-3">mdi-numeric-3-circle</v-icon>
            <p class="text-content" style="margin-left: 1vh">data analytics</p>
            <p class="text-content" style="margin-left: auto">10/1000000</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import type { Profile } from '@/types/Profile'
import type { SkillNode } from '@/types/SkillNode'
import { onMounted, ref } from 'vue'

const auth = useAuthStore()
const profile = ref<Profile | null>()

onMounted(async () => {
  profile.value = await auth.fetchProfile()
})

const mockSkills: SkillNode[] = [
  {
    id: 'softdev',
    name: 'Software Development Skills',
    pass: true,
    children: [{ id: 'softdev_meth', name: 'Software Development Methodologies', pass: false }]
  }
]

const socials = [
  { name: '@placeholder', link: 'https://line.me/th', icon: '/socials/line.svg', alt: 'Line' },
  {
    name: 'Firstname Lastname',
    link: 'https://facebook.com',
    icon: 'socials/facebook.svg',
    alt: 'Facebook'
  },
  {
    name: 'place.holder',
    link: 'https://instagram.com',
    icon: 'socials/instagram.svg',
    alt: 'Instagram'
  },
  {
    name: 'Firstname Lastname',
    link: 'https://linkedin.com',
    icon: 'socials/linkedin.svg',
    alt: 'Linkedin'
  },
  {
    name: '@place.holder',
    link: 'https://x.com',
    icon: 'socials/twitter-x.svg',
    alt: 'Twitter (X)'
  }
]
</script>
<style>
.rounded-rectangle {
  width: 1vh; /* Adjust the width as needed */
  height: 3.5vh; /* Adjust the height as needed */
  background-color: #392fc5; /* Background color of the rectangle */
  border-top-left-radius: 50px; /* Adjust the radius as needed */
  border-top-right-radius: 50px; /* Adjust the radius as needed */
  border-bottom-left-radius: 50px; /* Adjust the radius as needed */
  border-bottom-right-radius: 50px; /* Adjust the radius as needed */
}
</style>
