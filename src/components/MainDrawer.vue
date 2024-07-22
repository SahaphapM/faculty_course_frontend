<template>
  <v-navigation-drawer v-model="dStore.isDrawerOpen" mobile>
    <v-row no-gutters class="pa-2">
      <v-col cols="auto">
        <v-app-bar-nav-icon @click="() => dStore.switchDrawer()" />
      </v-col>
      <v-col cols="5" class="d-flex align-center">
        <v-img src="/img/logo-buu-2.png" max-height="40px"></v-img>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-list>
      <v-list-item> </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useDrawerStore } from '@/stores/drawer'

const dStore = useDrawerStore()
</script>
