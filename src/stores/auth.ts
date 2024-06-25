import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import authService from '@/service/auth'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const email = ref('john.doe@example.com')
  const password = ref('password123')

  async function login(email: string, password: string) {
    const res = await authService.login(email, password)
    localStorage.setItem('user', JSON.stringify(res.data.user))
    console.log('User Login Success')
    // replace back ไม่ได้ push back ได้
    router.push('/')
  }

  async function loginGoogle() {
    const res = await authService.loginGoogle()
  }

  return { login, loginGoogle, email, password }
})
