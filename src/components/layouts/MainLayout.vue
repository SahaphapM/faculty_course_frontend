<script setup lang="ts">
import MainAppBar from '../display/MainAppBar.vue'
</script>

<template>
  <v-layout class="rounded rounded-md">
    <MainAppBar></MainAppBar>

    <v-main class="align-center justify-center" style="min-height: 900px">
      <v-sheet class="bg-grey-lighten-4">
        <RouterView />
        <div style="position: relative">
          <v-row justify="end" class="ma-3">
            <v-speed-dial class="ms-5 mb-5" location="bottom end" size="64" absolute app appear>
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  class="rounded-circle"
                  v-bind="activatorProps"
                  size="large"
                  icon="mdi-menu"
                ></v-btn>
              </template>

              <v-btn key="1" icon="mdi-check-circle" class="rounded-circle"></v-btn>
              <v-btn
                key="2"
                icon="mdi-information"
                class="rounded-circle"
                to="/AddIFAAIView"
              ></v-btn>
              <v-btn key="3" icon="mdi-alert" class="rounded-circle" to="MainAdmin"></v-btn>
              <v-btn key="4" icon="mdi-close-circle" class="rounded-circle"></v-btn>
            </v-speed-dial>
          </v-row>
        </div>
      </v-sheet>
    </v-main>
  </v-layout>
</template>
