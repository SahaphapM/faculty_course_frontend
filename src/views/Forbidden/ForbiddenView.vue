<template>
  <v-container fluid class="text-center">
    <v-icon size="160" class="mx-auto" round icon="mdi-block-helper" color="error"></v-icon>
    <h2 class="text-h1">403</h2>
    <p class="text-h3">Forbidden</p>
    <p class="mt-2">Access to this resource on the server is denied !</p>
    <p class="mt-2">Redirect to home page in {{ countdown }} seconds</p>
    <v-btn variant="flat" color="primary" class="mt-5" @click="() => router.back()">
      Go Back
    </v-btn>
  </v-container>
</template>

<script lang="ts" setup>
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref, onUnmounted } from 'vue'

const countdown = ref(10)
let intervalId: number | undefined
const user = ref()
const auth = useAuthStore()

onMounted(async () => {
  user.value = await auth.fetchProfile()

  intervalId = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(intervalId)
      router.back()
    }
  }, 1000)
})

onUnmounted(() => {
  if (intervalId !== undefined) {
    clearInterval(intervalId)
  }
})
</script>
