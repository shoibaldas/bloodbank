import {
  createTheme,
  createText,
  createBox,
  useTheme as useReTheme,
  createVariant,
  createRestyleComponent,
  VariantProps,
} from '@shopify/restyle'
import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  PressableProps,
  Pressable,
  Text as RnText,
} from 'react-native'
import palette from './palette'
import textVariants from './textVariants'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
import cardVariants from './cardVariants'
import React from 'react'
import { hp } from '@src/utils'

const theme = createTheme({
  colors: {
    primary: palette.red,
    secondary: palette.hanBlue,
    primaryLight: palette.menthol,
    danger: palette.red,
    text: palette.black,
    grey: palette.grey,
    white: palette.white,
    offWhite: palette.offWhite,
    lightGrey: palette.lightGrey,
    darkGrey: palette.darkGrey,
    background: palette.white,
    transparent: 'transparent',
    purple: palette.purple,
    lightPurple: palette.lightPurple,
    green: palette.green,
  },
  spacing: {
    s: Math.round(hp(1)),
    m: Math.round(hp(2)),
    l: Math.round(hp(3)),
    xl: Math.round(hp(6)),
    none: 0,
    bottomTab: 55,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  borderRadii: {
    s: 5,
    m: 10,
    l: 20,
    xl: 32,
    none: 0,
    round: 100 / 2,
  },
  textVariants,
  cardVariants: cardVariants as any,
})

export type Theme = typeof theme

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

export const makeStyles =
  <T extends NamedStyles<T> | NamedStyles<any>>(styles: (theme: Theme) => T) =>
  () => {
    const currentTheme = useTheme()
    return styles(currentTheme)
  }

const variant = createVariant({ themeKey: 'cardVariants' })

type CardProps = VariantProps<Theme, 'cardVariants'> & {
  children?: React.ReactNode
}

const CardV = createRestyleComponent<CardProps, Theme>([variant])

export const Card = createBox<Theme, CardProps>(CardV)

const Text = createText<Theme>(RnText)
Text.defaultProps = {
  variant: 'body',
}

export const Box = createBox<Theme>()
export const SafeBox = createBox<Theme, SafeAreaViewProps>(SafeAreaView)
export const useTheme = () => useReTheme<Theme>()
export interface TouchBoxProps extends PressableProps {
  children?: React.ReactNode | React.ReactNode[]
}
export const TouchBox = createBox<Theme, TouchBoxProps>((props) => (
  <Pressable {...props} />
))
export { Text }

export default theme
