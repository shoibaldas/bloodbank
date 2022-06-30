import { createAsyncThunk } from '@reduxjs/toolkit'
import { authService, geoService } from '@src/services'
import { Location, User } from '@src/types/auth.types'
import { getErrorMessage, showErrorSnackbar } from '@src/utils'
import { GeoPosition } from 'react-native-geolocation-service'

export const loginAsync = createAsyncThunk<
  User,
  { password: string; email: string }
>('auth/login', async (data) => {
  try {
    await authService.login(data.email, data.password)
    const position = await geoService.getCurrentPosition()
    const location = getLocation(position)
    const userRef = await updateUserLocation(location)
    const snap = await userRef.get()
    return snap.data() as User
  } catch (error) {
    const message = getErrorMessage(error)
    showErrorSnackbar(message)
    return Promise.reject(error)
  }
})

export const logoutAsync = createAsyncThunk<string, void>(
  'auth/logout',
  async () => {
    try {
      await authService.logout()
      return 'done'
    } catch (error) {
      const message = getErrorMessage(error)
      showErrorSnackbar(message)
      return Promise.reject(error)
    }
  },
)

export const signupAsync = createAsyncThunk<User, any>(
  'auth/signup',
  async (data) => {
    try {
      const position = await geoService.getCurrentPosition()
      const location = getLocation(position)
      const user = await authService.signup(
        data.email,
        data.password,
        data.name,
        data.bloodGroup,
        data.phone,
        location,
      )
      return user
    } catch (error) {
      const message = getErrorMessage(error)
      showErrorSnackbar(message)
      return Promise.reject(error)
    }
  },
)

export const updateLocation = createAsyncThunk<Location, GeoPosition>(
  'auth/updateLocation',
  async (pos) => {
    try {
      const location = getLocation(pos)
      await updateUserLocation(location)
      return location
    } catch (error) {
      return Promise.reject('false')
    }
  },
)

const getLocation = (pos: GeoPosition): Location => {
  return {
    lat: pos.coords.latitude,
    long: pos.coords.longitude,
  }
}

const updateUserLocation = async (location: Location) => {
  const userRef = authService.getUserDocRef()
  if (!userRef) {
    throw new Error('')
  }
  await userRef.update({
    location,
  })
  return userRef
}
