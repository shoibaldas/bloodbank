import { Spacer } from '@src/components'
import { useMount } from '@src/hooks'
import { AppNavigationProps } from '@src/navigtation/types'
import { selectUser } from '@src/redux/auth/auth.selectors'
import { geoService } from '@src/services'
import { Box, Text } from '@src/theme'
import { delay } from '@src/utils'
import LottieView from 'lottie-react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const AnimationSize = 200

const StartupScreen: React.FC<AppNavigationProps<'Startup'>> = ({
  navigation,
}) => {
  const user = useSelector(selectUser)
  const navigate = () => {
    if (!user) {
      navigation.replace('Authentication')
      return
    }
    navigation.replace('AppHome')
  }

  const init = async () => {
    try {
      await geoService.requestPermission()
      await delay(2500)
      navigate()
    } catch (error) {
      await delay(1000)
      navigate()
    }
  }
  useMount(async () => {
    await init()
  })
  return (
    <Box
      backgroundColor='background'
      flex={1}
      justifyContent='center'
      alignItems='center'>
      <LottieView
        style={{ height: AnimationSize }}
        source={require('@src/assets/animations/blood-donate.json')}
        loop={true}
        autoPlay={true}
      />
      <Spacer space='large' />
      <Text color='grey' variant='logo'>
        Donate Blood , Save Life ❤️
      </Text>
    </Box>
  )
}

export default StartupScreen
