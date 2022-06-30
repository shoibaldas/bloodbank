import { Box, Text, TouchBox, useTheme } from '@src/theme'
import { fp } from '@src/utils'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'

export interface DrawerItemProps {
  left?: string
  title: string
  right?: boolean
  onPress?: () => void
  focused?: boolean
}

const DrawerItem = ({
  left = 'map-pin',
  title,
  right,
  onPress,
  focused,
}: DrawerItemProps) => {
  const theme = useTheme()
  return (
    <TouchBox
      paddingHorizontal='s'
      paddingVertical='m'
      onPress={onPress}
      flexDirection='row'
      justifyContent='space-between'
      style={{ backgroundColor: focused ? '#f0f0f0' : '#fff' }}
      alignItems='center'>
      <Icon
        name={left}
        size={fp(2.3)}
        color={theme.colors.text}
        style={{ marginRight: theme.spacing.s }}
      />
      <Box flex={1}>
        <Text
          variant='title'
          fontFamily={right ? 'Poppins-Bold' : 'Poppins-Medium'}>
          {title}
        </Text>
      </Box>
      {right ? <Icon name='chevron-right' size={fp(2.3)} color='grey' /> : null}
    </TouchBox>
  )
}

export default DrawerItem
