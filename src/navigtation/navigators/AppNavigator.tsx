import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackRoutes } from '../types'
import { stackScreenOptions } from '../options'
import AuthNavigator from './AuthNavigator'
import HomeNavigator from './HomeNavigator'
import { CreateRequest, StartupScreen } from '@src/Screens/AppStack'

const { Navigator, Screen } = createNativeStackNavigator<AppStackRoutes>()

const AppNavigator: React.FC = () => {
  return (
    <Navigator screenOptions={stackScreenOptions}>
      <Screen name='Startup' component={StartupScreen} />
      <Screen name='Authentication' component={AuthNavigator} />
      <Screen name='AppHome' component={HomeNavigator} />
      <Screen name='CreateRequest' component={CreateRequest} />
    </Navigator>
  )
}

export default AppNavigator
