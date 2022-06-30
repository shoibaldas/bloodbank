import React from 'react'
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RnTextInputProps,
} from 'react-native'
import { Box, useTheme, Text, Theme } from '@src/theme'
import Icon from 'react-native-vector-icons/Feather'
import RoundedIcon from '../RoundedIcon'
import { RoundedIconButton } from '../button'
import { BoxProps } from '@shopify/restyle'

interface TextInputProps extends RnTextInputProps {
  icon?: string
  placeholder?: string
  error?: string
  touched?: boolean
  label?: string
  labelVariant?: keyof Theme['textVariants']
  height?: number
  box?: boolean
  password?: boolean
  contentContainerStyle?: BoxProps<Theme>
}
export type TextInputRef = RNTextInput

const SIZE = 18

const TextInput = React.forwardRef<TextInputRef, TextInputProps>(
  (
    {
      icon,
      error,
      touched,
      label,
      labelVariant,
      height,
      box,
      multiline,
      password,
      contentContainerStyle,
      ...props
    }: TextInputProps,
    ref,
  ) => {
    const theme = useTheme()
    theme
    const reColor: keyof typeof theme.colors = !touched
      ? 'grey'
      : !error
      ? 'secondary'
      : 'danger'
    const color = theme.colors[reColor]
    const [view, setView] = React.useState<boolean>(false)

    return (
      <Box paddingHorizontal='s' paddingVertical='s' {...contentContainerStyle}>
        {label ? (
          <Text variant={labelVariant} marginVertical='s'>
            {label}
          </Text>
        ) : null}
        <Box
          borderWidth={box ? StyleSheet.hairlineWidth : 0}
          borderBottomWidth={StyleSheet.hairlineWidth}
          flexDirection='row'
          alignItems={multiline ? 'flex-start' : 'center'}
          borderRadius='s'
          height={height || 45}
          backgroundColor='white'
          borderColor={reColor}>
          {icon ? (
            <Icon
              name={icon}
              size={SIZE}
              style={{ paddingHorizontal: 8, alignSelf: 'center' }}
              color={color}
            />
          ) : null}
          <RNTextInput
            ref={ref}
            underlineColorAndroid='transparent'
            style={{ flex: 1 }}
            secureTextEntry={password && !view}
            placeholderTextColor={theme.colors.grey}
            multiline={multiline}
            {...props}
          />
          {touched && !box ? (
            <Box marginHorizontal='s'>
              {!password ? (
                <RoundedIcon
                  name={!error ? 'check' : 'x'}
                  color='white'
                  backgroundColor={error ? 'danger' : 'primary'}
                  size={SIZE}
                />
              ) : null}
            </Box>
          ) : null}
          {password ? (
            <RoundedIconButton
              name={view ? 'eye' : 'eye-off'}
              color='grey'
              backgroundColor='background'
              size={SIZE + 8}
              onPress={() => setView(!view)}
            />
          ) : null}
        </Box>
        {touched && error ? (
          <Text variant='body' color='danger' marginHorizontal='m'>
            {error}
          </Text>
        ) : null}
      </Box>
    )
  },
)

export default TextInput
