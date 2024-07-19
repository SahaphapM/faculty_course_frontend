<template>
  <v-dialog v-model="store.isDialogOpen" max-width="500">
    <v-card class="rounded-lg"
      ><v-card-text>
        <v-text-field prepend-icon="mdi-magnify" clearable placeholder="Search..."> </v-text-field>
        <v-row no-gutters class="d-flex justify-center">
          <v-btn class="rounded-xl" flat>let's go</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { searchStore } from '@/stores/search'

const store = searchStore()
</script>
