import router from '@/router'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000'
})

function delay(sec: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(sec), sec * 1)
  })
}

function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`
  console.log('All cookies:', document.cookie)
  console.log('value', value)
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift()
  }
  return undefined
}

instance.interceptors.request.use(
  async function (config) {
    console.log('request interceptors')
    const token = getCookie('access_token')
    console.log('Access Token:', token)
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    console.log('token', token)
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  async function (res: any) {
    await delay(1)
    return res
  },
  function (error: any) {
    // const loadingStore = useLoadingStore()
    if (401 === error.response.status) {
      router.replace('/login')
      // loadingStore.finish()
    }
    return Promise.reject(error)
  }
)
export default instance
