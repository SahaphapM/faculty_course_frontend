<script setup lang="ts">
import MainAppBar from '../components/MainAppBar.vue'
import MainFooter from '../components/MainFooter.vue'
import MainDrawer from '../components/MainDrawer.vue'
</script>

<template>
  <v-layout class="h-full">
    <MainDrawer />
    <MainAppBar></MainAppBar>
    <v-main>
      <div class="mx-auto" style="min-height: 900px; max-width: 1440px"><RouterView /></div>
      <!-- <div :style="{ zIndex: 1000, position: 'fixed', right: '28px', bottom: '28px' }">
        <v-speed-dial class="ms-5 mb-5" size="64">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              color="accent-3"
              class="rounded-circle"
              v-bind="activatorProps"
              size="large"
              icon="mdi-menu"
            ></v-btn>
          </template>

          <v-btn color="accent-3" key="1" icon="mdi-check-circle" class="rounded-circle"></v-btn>
          <v-btn
            color="accent-3"
            key="2"
            icon="mdi-information"
            class="rounded-circle"
            to="/AddIFAAIView"
          ></v-btn>
          <v-btn
            color="accent-3"
            key="3"
            icon="mdi-alert"
            class="rounded-circle"
            to="MainAdmin"
          ></v-btn>
          <v-btn color="accent-3" key="4" icon="mdi-close-circle" class="rounded-circle"></v-btn>
        </v-speed-dial>
      </div> -->
      <MainFooter></MainFooter>
    </v-main>
  </v-layout>
</template>
