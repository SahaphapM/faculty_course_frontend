<script setup lang="ts">
import vuetify from '@/plugins/vuetify'
import { useDrawerStore } from '@/stores/drawer'
import { useSearchStore } from '@/stores/search'
import { computed } from 'vue'

const isSmallDisplay = computed(() => vuetify.display.smAndDown)

const navMenu = [
  { title: 'หน้าหลัก', to: '/' },
  { title: 'ข่าวสาร', to: '/news' },
  { title: 'หลักสูตร', to: '/mainIFCurriculumView' },
  { title: 'ติดต่อ', to: '/contacts' }
]

const searchS = useSearchStore()
const drawerS = useDrawerStore()
</script>

<template>
  <v-app-bar class="w-screen bg-white px-3" height="65" flat>
    <v-app-bar-prepend>
      <v-app-bar-nav-icon @click="() => drawerS.switchDrawer()" />
    </v-app-bar-prepend>
    <v-app-bar-title>
      <v-img src="./img/logo-buu-2.png" max-width="70px"></v-img>
    </v-app-bar-title>
    <v-app-bar-append>
      <v-row no-gutters align="center">
        <v-col>
          <v-text-field
            @click="() => searchS.switchToggle()"
            v-if="!isSmallDisplay.value"
            clearable
            min-width="200"
            class="mt-5 mr-3"
            density="compact"
            rounded
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            placeholder="Search"
            readonly
          ></v-text-field>
          <v-btn
            v-else
            @click="() => searchS.switchToggle()"
            icon="mdi-magnify"
            density="comfortable"
          ></v-btn>
        </v-col>
        <v-col>
          <v-btn v-if="isSmallDisplay.value" icon="mdi-login"></v-btn>
          <v-btn v-else class="rounded-xl bg-buu-gold" to="/login">
            <p class="font-weight-bold">Login</p>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar-append>
  </v-app-bar>
  <v-app-bar class="bg-secondary">
    <v-container>
      <v-btn v-for="nav in navMenu" :key="nav.title" class="rounded-xl" color="white" :to="nav.to">
        {{ nav.title }}
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<!-- <style scoped>
div {
  font-family: 'Kanit';
}
.custom-title {
  color: #fff;
  margin-left: 10px;
}
.button-bar {
  justify-content: space-around;
  background-color: #212d69;
  padding: 10px 0;
}
.button-bar .v-btn {
  color: white !important;
}
.left-align {
  display: flex;
  align-items: center;
}
</style> -->