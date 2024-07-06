import router from '@/router'
import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

function delay(sec: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(sec), sec * 1)
  })
}

instance.interceptors.response.use(
  async function (res: any) {
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
