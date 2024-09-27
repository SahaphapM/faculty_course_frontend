import axios, { AxiosError, type AxiosResponse } from 'axios'
// import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// function delay(sec: number) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(sec), sec * 1)
//   })
// }

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
  async function (res: AxiosResponse) {
    return res
  },
  function (error: AxiosError) {
    // const loadingStore = useLoadingStore()
    if (401 === error.status) {
      // router.replace('/login')
      // loadingStore.finish()
    }
    return Promise.reject(error)
  }
)

export default instance
