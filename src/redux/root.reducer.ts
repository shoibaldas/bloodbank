import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authReducer } from './auth/auth.slice'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
}

const rootReducer = combineReducers({
  auth: authReducer,
})

export default persistReducer(persistConfig, rootReducer)
