<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import GoogleButton from '@/views/login/GoogleButton.vue'
import { ref } from 'vue';

const authStore = useAuthStore()

const visible = ref(false)
const woring = ref(true)


</script>

<template>
  <div>
    <v-img class="mx-auto my-6" max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
        variant="outlined" v-model="authStore.email"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a class="text-caption text-decoration-none text-blue" href="home" rel="noopener noreferrer" target="_blank">
          Forgot login password?</a>
      </div>

      <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
        density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
        @click:append-inner="visible = !visible" v-model="authStore.password"></v-text-field>

      <v-card class="mb-12" color="surface-variant" variant="tonal" v-if="woring">
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If
          you must login now, you can also click "Forgot login password?" below to reset the login password.
        </v-card-text>
      </v-card>

      <v-btn class="mb-8" color="blue" size="large" variant="tonal" block
        v-on:click="authStore.login(authStore.email, authStore.password)">
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <a class="text-blue text-decoration-none" rel="noopener noreferrer" target="_blank">
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
      <div class="text-center">
        <GoogleButton></GoogleButton>
      </div>
    </v-card>
  </div>

</template>
