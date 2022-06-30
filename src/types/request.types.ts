import { BloodGroup, User } from './auth.types'

export type BloodRequest = {
  bloodGroup: BloodGroup
  user: User
  phone: number
  address: string
  id: string
}
