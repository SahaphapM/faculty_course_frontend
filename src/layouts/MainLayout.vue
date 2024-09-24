<script setup lang="ts">
import MainAppBar from '../components/MainAppBar.vue'
import MainDrawer from '../components/MainDrawer.vue'
</script>

<template>
  <v-main app>
    <MainAppBar></MainAppBar>
    <MainDrawer />
    <RouterView class="mx-auto overflow-y-auto" style="min-height: 900px" />
  </v-main>
</template>
