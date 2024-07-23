import type { AxiosResponse } from 'axios'
import http from './http'

async function login(email: string, password: string): Promise<AxiosResponse> {
  const res = await http.post('/auth/login', { email, password })
  console.log(res)
  return res
}

function loginGoogle() {
  window.location.href = http.defaults.baseURL + '/auth/google'
}

async function profile() {
  const res = await http.get('/auth/profile')
  return res
}

export default { login, loginGoogle, profile }
