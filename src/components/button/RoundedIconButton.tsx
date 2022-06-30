import { Box, TouchBox, Text } from '@src/theme'
import React from 'react'
import { RoundedIconProps } from '../RoundedIcon'
import Icon from 'react-native-vector-icons/Feather'

interface RoundedIcnBtnProps extends RoundedIconProps {
  onPress?: () => void
  boxProps?: any
}

const RoundedIconButton: React.FC<RoundedIcnBtnProps> = ({
  onPress,
  iconRatio = 0.6,
  ...props
}: RoundedIcnBtnProps) => {
  const iconSize = props.size * iconRatio
  return (
    <Box
      justifyContent='center'
      alignItems='center'
      borderRadius='round'
      overflow='hidden'>
      <TouchBox
        backgroundColor={props.backgroundColor}
        height={props.size}
        width={props.size}
        android_ripple={{ borderless: true, radius: props.size }}
        justifyContent='center'
        alignItems='center'
        borderRadius='round'
        onPress={onPress}>
        <Text color={props.color} style={{ height: iconSize, width: iconSize }}>
          <Icon name={props.name} size={iconSize} />
        </Text>
      </TouchBox>
    </Box>
  )
}

export default RoundedIconButton
