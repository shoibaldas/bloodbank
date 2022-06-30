import { TextProps } from '@shopify/restyle'
import React from 'react'
import { Text, Theme, TouchBox, useTheme } from '@src/theme'
import Icon from 'react-native-vector-icons/Feather'

export interface LinkButtonProps extends TextProps<Theme> {
  onPress?: () => void
  title: string
  color?: keyof Theme['colors']
  icon?: string
}

const LinkButton: React.FC<LinkButtonProps> = ({
  onPress,
  title,
  color,
  icon,
  ...props
}) => {
  const theme = useTheme()
  return (
    <TouchBox alignItems='center' flexDirection='row' onPress={onPress}>
      {icon ? (
        <Icon
          name={icon}
          size={20}
          style={{ marginRight: 8 }}
          color={theme.colors[color ? color : 'primary']}
        />
      ) : null}
      <Text
        {...props}
        lineHeight={20}
        variant='button'
        color={color ? color : 'secondary'}>
        {title}
      </Text>
    </TouchBox>
  )
}

export default LinkButton
