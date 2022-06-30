import { Button, LinkButton, RoundedIconButton, Spacer } from '@src/components'
import { Box, Text, useTheme } from '@src/theme'
import React from 'react'
import { Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native'
import { hp, screenWidth } from '@src/utils'
import AnimatedLottieView from 'lottie-react-native'

export interface AuthLayoutProps {
  title: string
  mainButtonTitle?: string
  mainButtonPressed?: () => void
  onForgotPassword?: () => void
  onBackButtonPressed?: () => void
  onSignupPressed?: () => void
  onSkipPress?: () => void
  busy?: boolean
  children?: React.ReactNode | React.ReactNode[]
  signUpTitle?: string
  animation?: typeof AnimatedLottieView.prototype['props']['source']
}

const AuthLayout = ({
  title,
  mainButtonTitle,
  mainButtonPressed,
  onForgotPassword,
  onBackButtonPressed,
  onSignupPressed,
  onSkipPress,
  signUpTitle = "Don't have an account? Sign up",
  busy,
  children,
  animation = require('@src/assets/animations/login.json'),
}: AuthLayoutProps) => {
  const theme = useTheme()
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
      <ScrollView
        contentContainerStyle={{ backgroundColor: theme.colors.white }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode='interactive'>
        <Box
          minHeight={Dimensions.get('screen').height}
          flex={1}
          backgroundColor='white'>
          {onBackButtonPressed ? (
            <Box position='absolute' top={50} left={15}>
              <RoundedIconButton
                name='chevron-left'
                size={32}
                iconRatio={0.8}
                color='text'
                backgroundColor='background'
                onPress={onBackButtonPressed}
              />
            </Box>
          ) : null}
          <Box
            position='absolute'
            backgroundColor='danger'
            width={screenWidth}
            height={hp(42)}
            justifyContent='center'
            alignItems='center'
            zIndex={-1}
            top={0}>
            <AnimatedLottieView
              source={animation}
              style={{ height: 200 }}
              autoPlay={true}
              loop={true}
            />
          </Box>
          <Box height={hp(38)} zIndex={-1} />
          <Box
            backgroundColor='white'
            borderTopRightRadius='xl'
            borderTopLeftRadius='xl'
            marginBottom='l'
            width='100%'>
            <Spacer space='large' />
            <Text variant='logo' fontWeight='700' marginVertical='m'>
              {title}
            </Text>
            <Box width='100%' padding='m'>
              {children}
              {onForgotPassword ? (
                <Box
                  alignItems='flex-end'
                  marginHorizontal='m'
                  marginVertical='m'>
                  <LinkButton
                    title='Forgot Password?'
                    color='darkGrey'
                    textAlign='right'
                    fontWeight='700'
                    onPress={onForgotPassword}
                  />
                </Box>
              ) : null}
              {mainButtonPressed && mainButtonTitle ? (
                <Box marginTop='s'>
                  <Button
                    title={mainButtonTitle}
                    onPress={mainButtonPressed}
                    variant='primary'
                    loading={busy}
                  />
                </Box>
              ) : null}
            </Box>
            {onSignupPressed ? (
              <Box justifyContent='center' alignItems='center'>
                <LinkButton
                  title={signUpTitle}
                  textAlign='right'
                  onPress={onSignupPressed}
                />
              </Box>
            ) : null}
            {onSkipPress ? (
              <Box marginTop='l'>
                <LinkButton
                  title='Skip'
                  color='darkGrey'
                  onPress={onSkipPress}
                />
              </Box>
            ) : null}
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AuthLayout
