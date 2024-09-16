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
        <v-row no-gutters class="ga-5">
          <v-col cols="12">
            <v-card title="About me">
              <template #text>
                <p class="text-content px-5 pb-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum porro, tenetur
                  quasi nam nesciunt praesentium distinctio. Distinctio tenetur cumque perspiciatis
                  ullam fuga, id numquam sit nobis nesciunt obcaecati non maxime!
                </p>
              </template>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card class="text-content" title="Courses" subtitle="GPA 4.0">
              <template #text>
                <v-list class="pa-0">
                  <v-list-item> Course 1 </v-list-item>
                  <v-list-item> Course 2 </v-list-item>
                </v-list>
              </template></v-card
            >
          </v-col>
          <v-col cols="12">
            <v-card class="text-content" title="Skills">
              <template #text>
                <TreeSkillPlain :model-value="mockSkills" readonly />
              </template>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import TreeSkillPlain from '@/components/TreeSkillPlain.vue'
import { useAuthStore } from '@/stores/auth'
import type { Profile } from '@/types/Profile'
import type { SkillNode } from '@/types/SkillNode'
import { onMounted, ref } from 'vue'

const auth = useAuthStore()
const profile = ref<Profile | null>()

const tab = ref(null)

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
