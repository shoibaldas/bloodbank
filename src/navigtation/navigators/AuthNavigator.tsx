import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthRoutes } from '../types'
import { stackScreenOptions } from '../options'
import { ForgetPassword, Login, Signup } from '@src/Screens/Authentication'

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

const AuthNavigator: React.FC = () => {
  return (
    <Navigator screenOptions={stackScreenOptions}>
      <Screen name='Login' component={Login} />
      <Screen name='Signup' component={Signup} />
      <Screen name='ForgetPassword' component={ForgetPassword} />
    </Navigator>
  )
}

export default AuthNavigator
