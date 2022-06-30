import { Box } from '@src/theme'
import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

const OverLayLoader: React.FC = () => {
  return (
    <Box
      style={[
        StyleSheet.absoluteFill,
        // {
        //   backgroundColor: 'rgba(0,0,0, 0.3)',
        // },
      ]}
      justifyContent='center'
      alignItems='center'>
      <ActivityIndicator color='black' size='large' />
    </Box>
  )
}

export default OverLayLoader
