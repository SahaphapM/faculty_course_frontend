<script setup lang="ts">
import { useRoute } from 'vue-router'
import MainLayout from './components/layouts/MainLayout.vue'
import FullLayout from './components/layouts/FullLayout.vue'
import { provide, ref } from 'vue'
const drawer = ref(true)
const rail = ref(true)
provide('rail', rail)
provide('drawer', drawer)
const route = useRoute()
</script>

<template>
  <v-layout>
    <MainLayout v-if="route.meta.layout === 'MainLayout'"></MainLayout>
    <FullLayout v-if="route.meta.layout === 'FullLayout'"></FullLayout>
  </v-layout>
</template>

<style>
* {
  font-family: 'Kanit';
}
</style>
