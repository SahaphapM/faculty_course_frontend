import router from '@/router'
import axios, { AxiosError, type AxiosResponse } from 'axios'
// import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  (request: any) => {
    const accessToken = localStorage.getItem('token')
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (res: AxiosResponse) {
    return res
  },
  function (error: AxiosError) {
    if (error.status === 401) {
      router.replace('/login')
    } else {
      return Promise.reject(error)
    }
  }
)

export default instance
