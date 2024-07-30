// import { ref } from 'vue'
import { defineStore } from 'pinia'
import authService from '@/service/auth'
// import router from '@/router'
// import type { Axios, AxiosError, AxiosResponse } from 'axios'
// import router from '@/router'

// export const useAuthStore = defineStore('auth', () => {
//   const email = ref('john.doe@example.com')
//   const password = ref('password123')

//   async function login(email: string, password: string) {
//     const res = await authService.login(email, password)
//     localStorage.setItem('user', JSON.stringify(res.data.user))

//     console.log('User Login Success')
//     console.log(res.data.user)
//     console.log(res.data)
//     // replace back ไม่ได้ push back ได้
//     router.push('/')
//   }

//   async function loginGoogle() {
//     const res = await authService.loginGoogle()
//     console.error(res)
//     return res
//   }

//   return { login, loginGoogle, email, password }
// })
import Cookies from 'js-cookie'
import router from '@/router'

interface Profile {
  email: string | undefined
}

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      user: {
        email: '',
        password: ''
      },
      profile: {
        email: undefined
      }
    }
  },
  getters: {
    getToken: () => Cookies.get('access_token') || null,
    getProfile: (s): Profile => s.profile
  },
  actions: {
    async fetchProfile() {
      try {
        const res = await authService.profile()
        this.profile.email = res.data.email
      } catch (e) {
        console.error(e)
      }
    },
    async login() {
      const res = await authService.login(this.user.email, this.user.password)
      Cookies.set('access_token', res.data, { expires: 7 })
    },
    loginGoogle() {
      authService.loginGoogle()
    },
    logout() {
      Cookies.remove('access_token')
      router.replace('/')
    }
  }
})
