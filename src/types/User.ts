import type { Role } from './Role'
type User = {
  id: string | null
  email: string
  password: string
  firstName: string
  middleName: string | null
  lastName: string
  gender: string
  phone: string
  googleId: string
  roles: Role[] | null
}

export type { User }
