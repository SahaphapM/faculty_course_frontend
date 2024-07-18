<script setup lang="ts">
import vuetify from '@/plugins/vuetify'
import { computed } from 'vue'

const isSmallDisplay = computed(() => vuetify.display.smAndDown)

const navMenu = [
  { title: 'หน้าหลัก', to: '/' },
  { title: 'ข่าวสาร', to: '/news' },
  { title: 'หลักสูตร', to: '/mainIFCurriculumView' },
  { title: 'ติดต่อ', to: '/contacts' }
]
</script>

<template>
  <!-- <div>
    <v-app-bar style="background-color: #102073">
      <v-img
        style="margin-left: 70px"
        src="./img/Buu-logo11.png"
        max-width="55px"
        class="mr-2"
      ></v-img>
      <v-app-bar-title class="custom-title">
        <div>มหาวิทยาลัยบูรพา</div>
        <div>Burapha University</div>
      </v-app-bar-title>
    </v-app-bar>
    <v-app-bar style="background-color: #112f69">
      <div class="">
        <v-btn color="white" to="/"> หน้าหลัก </v-btn>
        <v-btn color="white" to="/news"> ข่าวสาร </v-btn>
        <v-btn color="white" to="/mainIFCurriculumView"> หลักสูตร </v-btn>
        <v-btn color="white" to="/contacts"> ติดต่อ </v-btn>
      </div>
    </v-app-bar>
  </div> -->
  <v-app-bar class="w-screen bg-primary" height="70" flat>
    <v-container class="d-flex align-center">
      <v-img src="./img/Buu-logo11.png" max-width="52px" class="mr-3"></v-img>
      <v-app-bar-title>
        <div>มหาวิทยาลัยบูรพา</div>
        <div>Burapha University</div>
      </v-app-bar-title>
      <v-app-bar-append>
        <v-row no-gutters align="center">
          <v-col>
            <v-text-field
              v-if="!isSmallDisplay.value"
              clearable
              min-width="200"
              class="mt-5 mr-3"
              density="compact"
              rounded
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              placeholder="Search"
            ></v-text-field>
            <v-btn v-else icon="mdi-magnify" density="comfortable"></v-btn>
          </v-col>
          <v-col>
            <v-btn v-if="isSmallDisplay.value" icon="mdi-login"></v-btn>
            <v-btn v-else class="rounded-xl bg-buu-gold">
              <p class="font-weight-bold">Login</p>
            </v-btn>
          </v-col>
        </v-row>
      </v-app-bar-append>
    </v-container>
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
