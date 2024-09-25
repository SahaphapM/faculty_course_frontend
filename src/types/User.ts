import type { Role } from './Role'
type User = {
  id?: number
  email: string
  password: string
  firstName: string
  lastName: string
  gender: string
  // phone: string
  // image: string
  roles: Role[] | null
  // facultyId: string
  // branchId: string
}

export type { User }
