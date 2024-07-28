<script setup lang="ts">
import { useRoute } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import FullLayout from './layouts/FullLayout.vue'
import SearchDialog from './components/SearchDialog.vue'
const route = useRoute()
</script>

<template>
  <v-layout>
    <MainLayout v-if="route.meta.layout === 'MainLayout'"> </MainLayout>
    <FullLayout v-if="route.meta.layout === 'FullLayout'"></FullLayout>
    <SearchDialog />
  </v-layout>
</template>

<style>
/* deep vuetify css config for entire app*/
* {
  font-family: 'Kanit';
}
.v-card > .v-card-title {
  font-size: 24px;
}
.v-card > .v-card-subtitle {
  font-size: 20px;
}
.v-card > .v-card-text {
  font-size: 18px;
}
</style>
