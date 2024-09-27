import type { Role } from './Role'
type Teacher = {
  id: string | null
  email: string
  password: string
  firstName: string
  middleName: string | null
  lastName: string
  gender: string
  phone: string
  image: string
  googleId: string
  roles: Role[] | null
  facultyId: string
  branchId: string
}

export type { Teacher }
