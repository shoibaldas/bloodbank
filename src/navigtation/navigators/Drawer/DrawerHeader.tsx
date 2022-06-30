import RoundedIcon from '@src/components/RoundedIcon'
import { Box, Text, TouchBox } from '@src/theme'
import { User } from '@src/types/auth.types'
import { hp } from '@src/utils'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Feather'

export interface DrawerHeaderProps {
  user: User
  onPress?: () => void
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ user, onPress }) => {
  const insets = useSafeAreaInsets()
  return (
    <TouchBox onPress={onPress}>
      <Box
        position='absolute'
        top={0}
        width='100%'
        height={hp(30) + insets.top}
        backgroundColor='danger'
      />
      <Box
        height={hp(20) + insets.top}
        marginBottom='s'
        paddingHorizontal='s'
        style={{ paddingTop: insets.top + 20 }}>
        <Box flexDirection='row'>
          <RoundedIcon
            size={64}
            backgroundColor='white'
            color='text'
            name='user'
          />
          <Box marginLeft='m'>
            <Text variant='logo' textAlign='left' color='white'>
              {user.name}
            </Text>
            <Text variant='subtitle' color='white'>
              <Icon name='mail' /> : {user.email}
            </Text>
            <Text variant='subtitle' color='white'>
              <Icon name='droplet' /> : {user.bloodGroup} ve
            </Text>
            <Text variant='subtitle' color='white'>
              <Icon name='phone' /> : {user.phone}
            </Text>
          </Box>
        </Box>
      </Box>
    </TouchBox>
  )
}

export default DrawerHeader
