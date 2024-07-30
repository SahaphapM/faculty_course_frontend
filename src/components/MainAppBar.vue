<script setup lang="ts">
import vuetify from '@/plugins/vuetify'
import { useDrawerStore } from '@/stores/drawer'
import { useSearchStore } from '@/stores/search'
import { computed, onMounted, ref } from 'vue'
import LanguageBtns from './LanguageBtns.vue'
import { useLocale } from 'vuetify'
import { appBarMenu } from '@/models/navigation'
import { useAuthStore } from '@/stores/auth'

const { t } = useLocale()

const isSmallDisplay = computed(() => vuetify.display.smAndDown.value)

const menu = ref(appBarMenu)

const searchS = useSearchStore()
const drawerS = useDrawerStore()

const auth = useAuthStore()
const profile = computed(() => auth.getProfile)

// onMounted(() => {
//   auth.fetchProfile()
// })
</script>

<template>
  <v-app-bar class="w-screen bg-secondary px-3" height="65" flat>
    <template #prepend>
      <div :style="{ width: '179px' }" class="d-flex">
        <v-app-bar-nav-icon @click="() => drawerS.switchDrawer()" />
        <v-img src="./img/logo-buu-2_1.png" max-width="70px"></v-img>
      </div>
    </template>
    <v-app-bar-title class="d-flex justify-center">
      <v-text-field
        @click="() => searchS.switchToggle()"
        v-if="!isSmallDisplay"
        min-width="300"
        class="mt-5"
        append-inner-icon="mdi-magnify"
        variant="solo"
        density="compact"
        placeholder="ค้นหา..."
        readonly
      ></v-text-field>
    </v-app-bar-title>
    <template #append>
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
        <v-btn class="bg-buu-gold" to="/login" v-if="!profile.email">
          <p class="font-weight-bold">{{ t('login') }}</p>
        </v-btn>
        <v-btn v-else size="large">
          <v-avatar icon="mdi-account" color="white"> </v-avatar>
          <v-menu activator="parent">
            <v-list>
              <v-list-item to="/profile"> {{ t('profile') }} </v-list-item>
              <v-list-item @click="auth.logout()"> {{ t('logout') }} </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </div>
    </template>
  </v-app-bar>
  <v-app-bar class="bg-primary">
    <v-container style="max-width: 1440px">
      <v-btn v-for="nav in menu" :key="nav.title" color="white" :to="nav.to">
        {{ t(nav.title) }}
      </v-btn>
    </v-container>
  </v-app-bar>
</template>
