import type { Role } from './Role'

export interface User {
  id: number
  email: string
  avatarUrl: string
  // hashedRefreshToken: string | null
  roles: Role[]
}
