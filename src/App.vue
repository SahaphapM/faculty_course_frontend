<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <v-layout>
    <MainAppBar></MainAppBar>
    <v-main class="align-center justify-center" style="min-height: 300px">
      <div class="pa-6">
        <router-view></router-view>
      </div>
    </v-main>
  </v-layout>
</template>
