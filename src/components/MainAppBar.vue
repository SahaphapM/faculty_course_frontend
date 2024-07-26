<script setup lang="ts">
import vuetify from '@/plugins/vuetify'
import { useDrawerStore } from '@/stores/drawer'
import { useSearchStore } from '@/stores/search'
import { computed, ref } from 'vue'
import LanguageBtns from './LanguageBtns.vue'
import { useLocale } from 'vuetify'
import { appBarMenu } from '@/models/navigation'

const { t } = useLocale()

const isSmallDisplay = computed(() => vuetify.display.smAndDown.value)

const menu = ref(appBarMenu)

const searchS = useSearchStore()
const drawerS = useDrawerStore()
</script>

<template>
  <v-app-bar class="w-screen bg-secondary px-3" height="65" flat>
    <v-app-bar-prepend :style="{ width: '179px' }" class="d-flex">
      <v-app-bar-nav-icon @click="() => drawerS.switchDrawer()" />
      <v-img src="./img/logo-buu-2_1.png" max-width="70px"></v-img>
    </v-app-bar-prepend>
    <v-app-bar-title class="d-flex justify-center">
      <v-text-field
        @click="() => searchS.switchToggle()"
        v-if="!isSmallDisplay"
        min-width="300"
        class="mt-5"
        density
        rounded
        append-inner-icon="mdi-magnify"
        variant="solo"
        placeholder="ค้นหา..."
        readonly
      ></v-text-field>
    </v-app-bar-title>

    <v-app-bar-append>
      <div class="d-flex" v-if="isSmallDisplay">
        <LanguageBtns />
        <v-menu>
          <template #activator="{ props }">
            <v-btn v-bind="props" icon="mdi-dots-vertical"></v-btn>
          </template>
          <v-list>
            <v-list-item title="Login" to="/login" append-icon="mdi-login"> </v-list-item>
            <v-list-item
              title="Search"
              append-icon="mdi-magnify"
              @click="() => searchS.switchToggle()"
            >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div v-else>
        <LanguageBtns />
        <v-btn class="rounded-xl bg-buu-gold" to="/login">
          <p class="font-weight-bold">{{ t('login') }}</p>
        </v-btn>
      </div>
    </v-app-bar-append>
  </v-app-bar>
  <v-app-bar class="bg-primary">
    <v-container style="max-width: 1440px">
      <v-btn v-for="nav in menu" :key="nav.title" class="rounded-xl" color="white" :to="nav.to">
        {{ t(nav.title) }}
      </v-btn>
    </v-container>
  </v-app-bar>
</template>
