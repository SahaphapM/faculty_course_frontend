<script setup lang="ts">
import MainAppBar from '../display/MainAppBar.vue'
</script>

<template>
  <v-layout class="rounded rounded-md">
    <MainAppBar></MainAppBar>
    <v-main class="align-center justify-center" style="min-height: 900px">
      <div class="pa-16">
        <RouterView />
      </div>
    </v-main>
  </v-layout>
</template>
