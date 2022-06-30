import React from 'react'
import { Box, SafeBox } from '@src/theme'

export interface ContainerProps {
  children?: React.ReactNode | React.ReactNode[]
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <Box flex={1} backgroundColor='background'>
      <SafeBox flex={1}>{children}</SafeBox>
    </Box>
  )
}

export default Container
