import { createSelector } from 'reselect'
import { RootState } from '../store'

const authState = (state: RootState) => state.auth

export const selectIsLoggingIn = createSelector(
  [authState],
  (auth) => auth.loggingIn,
)
export const selectIsSignupIn = createSelector(
  [authState],
  (auth) => auth.signupIn,
)

export const selectUser = createSelector([authState], (auth) => auth.user)
