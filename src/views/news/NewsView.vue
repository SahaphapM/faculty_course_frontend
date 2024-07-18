<template>
  <v-container>
    <v-row>
      <v-col v-for="n in 12" :key="n" cols="12" sm="4">
        <v-card class="rounded" hover>
          <v-card-title> News {{ n }}</v-card-title>
          <v-card-subtitle> {{ new Date().toLocaleDateString('th') }}</v-card-subtitle>
          <v-img
            max-height="240"
            draggable="false"
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            cover
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup></script>
