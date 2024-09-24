import type { Payload } from '@/types/Payload'
import http from './http'
import type { AxiosResponse } from 'axios'
import router from '@/router'

class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse> {
    const res = await http.post('/auth/login', { email, password })
    router.push('/')
    return res.data
  }

  static async isAuthenticated(): Promise<boolean> {
    return !!localStorage.getItem('token')
  }

  static loginGoogle() {
    window.location.href = http.defaults.baseURL + '/auth/google'
  }

  static async logout(): Promise<AxiosResponse> {
    try {
      const res = await http.post(`/auth/logout`, { withCredentials: true })
      localStorage.removeItem('token')
      window.location.reload()
      return res.data
    } catch (error) {
      console.error('Logout failed', error)
      throw error
    }
  }

  static async profile(): Promise<Payload | null> {
    try {
      const res = await http.get(`auth/profile`)
      return res.data
    } catch (err) {
      console.error(err)
      return null
    }
  }
}

export default AuthService
