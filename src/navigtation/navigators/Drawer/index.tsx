import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { Box } from '@src/theme'
import React from 'react'
import DrawerItem from './DrawerItem'
import { useSelector } from 'react-redux'
import { selectUser } from '@src/redux/auth/auth.selectors'
import DrawerHeader from './DrawerHeader'
import { Spacer } from '@src/components'
import { useAppDispatch } from '@src/hooks'
import { logoutAsync } from '@src/redux/auth/auth.async'
import { StackActions } from '@react-navigation/routers'

const MyDrawer = ({ state, navigation }: DrawerContentComponentProps) => {
  const dispatch = useAppDispatch()
  const user = useSelector(selectUser)
  const logout = async () => {
    try {
      await dispatch(logoutAsync())
    } catch (error) {}
  }
  React.useEffect(() => {
    if (!user) {
      navigation.dispatch(StackActions.replace('Authentication'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  if (!user) {
    return <Box />
  }
  return (
    <Box flex={1} backgroundColor='white'>
      <DrawerHeader user={user!} />
      <Box
        flex={1}
        backgroundColor='background'
        overflow='hidden'
        borderTopRightRadius='l'
        borderTopLeftRadius='l'>
        <DrawerItem
          focused={state.index === 0}
          title='Map'
          right
          onPress={() => navigation.navigate('Map')}
        />
        <DrawerItem
          focused={state.index === 1}
          title='Blood Requests'
          right
          onPress={() => navigation.navigate('Requests')}
          left='droplet'
        />
        <Spacer space='medium' />
        <DrawerItem left='log-out' title='Logout' right onPress={logout} />
      </Box>
    </Box>
  )
}

export default MyDrawer
