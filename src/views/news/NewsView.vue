<template>
  <v-container>
    <v-row>
      <v-col v-for="n in 12" :key="n" cols="12" sm="4">
        <BasicCard
          :title="`News ${n}`"
          :subtitle="new Date().toLocaleDateString()"
          text="lorem"
          :img-path="`https://picsum.photos/seed/${n}/280/120`"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import BasicCard from '@/components/BasicCard.vue'
</script>
