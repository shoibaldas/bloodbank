import { createSlice } from '@reduxjs/toolkit'
import { showSuccessSnackbar } from '@src/utils'
import {
  loginAsync,
  logoutAsync,
  signupAsync,
  updateLocation,
} from './auth.async'
import { AuthState } from './auth.types'

const initialState: AuthState = {
  loggingIn: false,
  signupIn: false,
  user: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {
      state.loggingIn = true
    })
    builder.addCase(loginAsync.rejected, (state) => {
      state.loggingIn = false
    })
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loggingIn = false
      state.user = action.payload
    })
    builder.addCase(signupAsync.pending, (state) => {
      state.signupIn = true
    })
    builder.addCase(signupAsync.rejected, (state) => {
      state.signupIn = false
    })
    builder.addCase(signupAsync.fulfilled, (state, action) => {
      state.signupIn = false
      state.user = action.payload
      showSuccessSnackbar('Signup successfull')
    })

    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.user = undefined
    })
    builder.addCase(logoutAsync.pending, (state) => {
      state.loggingIn = false
    })
    builder.addCase(logoutAsync.rejected, (state) => {
      state.loggingIn = false
    })
    builder.addCase(updateLocation.fulfilled, (state, action) => {
      if (state.user) {
        state.user.location = action.payload
      }
    })
    builder.addCase(updateLocation.pending, () => {})
    builder.addCase(updateLocation.rejected, () => {})
  },
})

export const { reducer: authReducer } = authSlice
