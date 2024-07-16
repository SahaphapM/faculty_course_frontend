<template>
  <v-footer class="bg-primary">
    <v-container flat>
      <v-row>
        <v-col v-for="n in 3" :key="n">
          <h3>About</h3>
          <v-list lines="one" class="bg-transparent">
            <v-list-item v-for="n in 3" :key="n" :title="'- Item ' + n"></v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <p>
          Copyright © 2018-2024 Faculty of Informatics, Burapha University. All rights reserved.
        </p>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts" setup></script>
