import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import { Text, Theme, makeStyles, useTheme, TouchBox, Box } from '@src/theme'
import Icon from 'react-native-vector-icons/Feather'
import { fp } from '@src/utils'

export interface ButtonProps {
  title: string
  icon?: string
  onPress?: () => void
  loading?: boolean
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'outline-light'
  block?: boolean
  disabled?: boolean
  fullLoader?: boolean
  background?: keyof Theme['colors']
  textColor?: keyof Theme['colors']
  boldText?: boolean
}

const Button: React.FC<ButtonProps> = ({
  title,
  icon,
  onPress = () => {},
  loading,
  variant,
  block,
  disabled,
  fullLoader,
  background,
  textColor,
  boldText = true,
}: ButtonProps) => {
  const theme = useTheme()
  const styles = useStyles()
  const backgroundColor = disabled
    ? theme.colors.grey
    : variant === 'primary'
    ? theme.colors.primary
    : variant === 'secondary'
    ? theme.colors.secondary
    : variant === 'outline-light'
    ? theme.colors.white
    : variant === 'danger'
    ? theme.colors.danger
    : theme.colors.lightGrey

  let color: keyof Theme['colors']
  switch (variant) {
    case 'primary':
      color = 'white'
      break
    case 'secondary':
      color = 'white'
      break
    case 'outline-light':
      color = 'text'
      break
    default:
      color = 'text'
  }
  color = textColor ? textColor : color
  const pressFunction = () => {
    if (disabled || loading) {
      return
    }
    onPress()
  }

  return (
    <Box marginHorizontal='s' borderRadius='s' overflow='hidden'>
      <TouchBox
        disabled={disabled}
        android_ripple={{ borderless: true }}
        style={[
          styles.container,
          {
            backgroundColor: background
              ? theme.colors[background]
              : backgroundColor,
            alignSelf: block ? 'stretch' : 'auto',
          },
        ]}
        onPress={pressFunction}>
        {icon && !loading ? <Icon name={icon} style={styles.icon} /> : null}
        {!fullLoader && loading ? (
          <ActivityIndicator
            size={fp(2.6)}
            color={theme.colors[color]}
            style={[styles.icon]}
          />
        ) : null}
        {fullLoader && loading ? (
          <ActivityIndicator size={fp(2.6)} color={theme.colors[color]} />
        ) : (
          <Text
            lineHeight={22}
            variant='button'
            textTransform='uppercase'
            fontFamily={
              !boldText || disabled ? 'Poppins-Regular' : 'Poppins-Bold'
            }
            color={color}>
            {title}
          </Text>
        )}
      </TouchBox>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing.s + 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    left: 8,
    fontSize: fp(2.6),
    color: 'white',
    marginRight: theme.spacing.s,
    fontWeight: 'bold',
  },
}))
export default Button
