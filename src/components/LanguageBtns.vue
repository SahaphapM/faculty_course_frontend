<template>
  <v-btn variant="text" flat v-if="current === 'th'" @click="() => changeLocale('en')">
    🇬🇧 EN
  </v-btn>
  <v-btn v-else variant="text" @click="() => changeLocale('th')"> 🇹🇭 TH </v-btn>
</template>

<script lang="ts" setup>
import { useLocale } from 'vuetify'

const { current } = useLocale()
function changeLocale(locale: string) {
  current.value = locale
}
</script>
