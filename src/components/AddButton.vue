<script lang="ts" setup>
const props = defineProps<{
  label: string
  toLink: string | null
  clickFucntion: () => void
}>()
</script>
<template>
  <v-btn
    rounded="lg"
    style="height: 55px; min-width: 170px; width: 100%"
    v-bind="{ to: props.toLink || undefined }"
    @click="clickFucntion"
  >
    <v-icon>mdi-plus</v-icon>&nbsp; {{ props.label }}
  </v-btn>
</template>
