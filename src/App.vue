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
* {
  font-family: 'Kanit';
}
</style>
