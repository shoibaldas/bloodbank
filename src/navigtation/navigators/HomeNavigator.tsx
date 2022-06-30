import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeRoutes } from '../types'
import { Map, Requests } from '@src/Screens/AppDrawer'
import { drawerScreenOptions } from '../options'
import MyDrawer from './Drawer'
import { useAppDispatch, useMount } from '@src/hooks'
import Geo from 'react-native-geolocation-service'
import { updateLocation } from '@src/redux/auth/auth.async'

const { Navigator, Screen } = createDrawerNavigator<HomeRoutes>()

const HomeNavigator: React.FC = () => {
  const dispatch = useAppDispatch()
  useMount(async () => {
    const watch = Geo.watchPosition(
      (position) => {
        dispatch(updateLocation(position))
      },
      () => {},
      { enableHighAccuracy: true, distanceFilter: 50 },
    )
    return () => {
      Geo.clearWatch(watch)
    }
  })
  return (
    <Navigator
      drawerContent={(props) => <MyDrawer {...props} />}
      screenOptions={drawerScreenOptions}>
      <Screen name='Map' component={Map} />
      <Screen name='Requests' component={Requests} />
    </Navigator>
  )
}

export default HomeNavigator
