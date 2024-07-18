<script setup lang="ts">
import MainAppBar from '../display/MainAppBar.vue'
import MainFooter from '../display/MainFooter.vue'
</script>

<template>
  <v-layout class="h-full">
    <MainAppBar></MainAppBar>
    <v-main class="align-center justify-center" style="min-height: 900px">
      <v-sheet>
        <RouterView />
        <div :style="{ zIndex: 1000, position: 'fixed', right: '28px', bottom: '28px' }">
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
        </div>
        <!-- <div style="position: relative">
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
        </div> -->
      </v-sheet>
      <MainFooter></MainFooter>
    </v-main>
  </v-layout>
</template>
