<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  label: string
  search: string
  fetchData: (search: string) => Promise<void>
}>()

const loading = ref(false)

const search = ref(props.search)
</script>

<template>
  <v-text-field
    :label="props.label"
    variant="outlined"
    density="compact"
    :loading="loading"
    append-inner-icon="mdi-magnify"
    v-model="search"
    rounded="lg"
    @click:append-inner="fetchData(search)"
    @keydown.enter="fetchData(search)"
    style="height: 55px; width: 100%; min-width: 250px"
  ></v-text-field>
</template>
