import { User } from '@src/types/auth.types'

export type AuthState = {
  loggingIn: boolean
  signupIn: boolean
  user?: User
}
