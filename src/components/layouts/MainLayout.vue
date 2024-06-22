<script setup lang="ts">
import MainAppBar from '../display/MainAppBar.vue'
</script>

<template>
  <v-layout class="rounded rounded-md">
    <MainAppBar></MainAppBar>
    <v-main class="align-center justify-center" style="min-height: 900px">
      <div>
        <RouterView />

        <v-row justify="end" class="ma-2">
          <v-speed-dial
            style="position: sticky-box; bottom: 16px; right: 16px"
            transition="fade-transition"
            justify="end"
          >
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                class="rounded-circle"
                v-bind="activatorProps"
                size="large"
                icon="mdi-menu"
              ></v-btn>
            </template>

            <v-btn key="1" icon="mdi-check-circle" class="rounded-circle"></v-btn>
            <v-btn key="2" icon="mdi-information" class="rounded-circle" to="/AddIFAAIView"></v-btn>
            <v-btn key="3" icon="mdi-alert" class="rounded-circle"></v-btn>
            <v-btn key="4" icon="mdi-close-circle" class="rounded-circle"></v-btn>
          </v-speed-dial>
        </v-row>
      </div>
    </v-main>
  </v-layout>
</template>
