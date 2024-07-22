<template>
  <v-card rounded="lg" hover>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-subtitle>
      {{ subtitle }}
    </v-card-subtitle>
    <v-img class="mt-3" max-height="240" draggable="false" :src="imgPath" cover></v-img>
    <v-card-text>
      {{ text }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  subtitle: string
  text: string
  imgPath: string
}>()
</script>
