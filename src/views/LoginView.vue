<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()



</script>

<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login form</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field prepend-icon="person" name="email" label="Email" type="text"
          v-model="authStore.email"></v-text-field>
        <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"
          v-model="authStore.password"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="authStore.login(authStore.email, authStore.password)">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>
