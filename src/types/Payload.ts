import type { Role } from './Role'

export interface Payload {
  id: string
  email: string
  roles: Role[]
  avatarUrl: string
}
