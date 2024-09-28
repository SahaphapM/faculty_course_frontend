import type { Payload } from '@/types/Payload'
import http from './http'
import type { AxiosError, AxiosResponse } from 'axios'
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
    localStorage.removeItem('token')
    window.location.href = http.defaults.baseURL + '/auth/google'
  }

  static async logout(): Promise<AxiosResponse> {
    try {
      const res = await http.post(`/auth/logout`, { withCredentials: true })
      localStorage.removeItem('token')
      window.location.reload()
      return res.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  static async profile(): Promise<Payload | null> {
    try {
      const res = await http.get(`auth/profile`)
      console.error(res)
      if (res.status === 401) {
        router.replace('/login')
        return null
      }
      return res.data
    } catch (err: AxiosError | any) {
      if (err.status === 401 || err.status === 403) {
        router.replace('/login')
      }
      console.error(err)
      return null
    }
  }
}

export default AuthService
