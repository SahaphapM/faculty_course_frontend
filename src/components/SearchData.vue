<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  label: string
  search: string
  fetchData: (search: string) => Promise<void>
}>()

const loading = ref(false)

const search = ref(props.search)

// Watch for changes in props.search and update local search
watch(
  () => props.search,
  (newSearch) => {
    console.log(newSearch)
    search.value = newSearch
  }
)
</script>

<template>
  <v-text-field
    :label="props.label"
    variant="outlined"
    :loading="loading"
    append-inner-icon="mdi-magnify"
    v-model="search"
    rounded="lg"
    @click:append-inner="fetchData(search)"
    @keydown.enter="fetchData(search)"
    style="height: 55px; width: 100%; min-width: 250px"
  ></v-text-field>
</template>
