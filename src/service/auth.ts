import http from './http'
function login(email: string, password: string) {
  const res = http.post('/auth/login', { email, password })
  console.log(res)
  return res
}

function loginGoogle() {
  return http.get('/auth/google')
}

export default { login, loginGoogle }
