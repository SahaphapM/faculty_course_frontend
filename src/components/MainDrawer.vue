<template>
  <v-navigation-drawer v-model="dStore.isDrawerOpen" mobile class="h-100">
    <v-row no-gutters class="pa-2">
      <v-col cols="auto">
        <v-app-bar-nav-icon @click="() => dStore.switchDrawer()" />
      </v-col>
      <v-col cols="5" class="d-flex align-center">
        <v-img src="/img/logo-buu-2.png" max-height="40px"></v-img>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-list class="mx-5">
      <v-list-item-title class="font-weight-medium" style="font-size: larger; text-align: center">
        Management
      </v-list-item-title>
      <v-divider></v-divider>
      <v-list-item v-for="nav in navMenu" :key="nav.title" :to="nav.to">
        {{ nav.title }}</v-list-item
      >
      <!-- <v-list-item link title="List Item 2"></v-list-item>
      <v-list-item link title="List Item 3"></v-list-item> -->
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useDrawerStore } from '@/stores/drawer'

const dStore = useDrawerStore()

const navMenu = [
  { title: 'Curriculum Management', to: 'MainIFAdmin' },
  { title: 'Subject Management', to: '/SkillView' },
  { title: 'Skill Management', to: '/manageSubject' },
  { title: 'User Management', to: '/users' }
]
</script>
