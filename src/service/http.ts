import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000'
})

function delay(sec: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(sec), sec * 1)
  })
}

instance.interceptors.response.use(
  async function (res: any) {
    await delay(1)
    return res
  },
  function (error: any) {
    return Promise.reject(error)
  }
)
export default instance
