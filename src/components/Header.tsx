import React from 'react'
import { Box, Text } from '@src/theme'
import { RoundedIconButton } from './button'
import { fp, hp } from '@src/utils'
import Spacer from './Spacer'

export interface HeaderProps {
  left: {
    icon: string
    onPress: () => void
  }
  title?: string
}

const Header: React.FC<HeaderProps> = ({ left, title }) => {
  const color = 'darkGrey'
  const backgroundColor = 'white'
  return (
    <Box
      flexDirection='row'
      alignItems='center'
      justifyContent='flex-start'
      paddingVertical='s'
      paddingHorizontal='s'
      height={hp(7)}
      shadowColor='text'
      shadowRadius={8}
      elevation={5}
      shadowOffset={{ width: 2, height: 0 }}
      backgroundColor={backgroundColor}>
      <RoundedIconButton
        onPress={left?.onPress}
        name={left?.icon}
        size={30}
        color={color}
        backgroundColor={backgroundColor}
        iconRatio={0.7}
      />
      <Spacer direction='horinzontal' space='small' />
      <Text lineHeight={28} fontSize={fp(2.8)} variant='title'>
        {title}
      </Text>
    </Box>
  )
}

export default Header
