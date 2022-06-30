import React from 'react'
import {
  PickerProps as RNPickerProps,
  Picker as RNPicker,
} from '@react-native-picker/picker'
import { Box, Text } from '@src/theme'
import { StyleSheet } from 'react-native'
import { fp } from '@src/utils'

export interface PickerProps extends RNPickerProps {
  title?: string
  children?: any
}

const Picker = ({ children, title, ...rest }: PickerProps) => {
  return (
    <Box marginHorizontal='s'>
      {title ? (
        <Text fontFamily='Poppins-Regular' fontSize={fp(1.8)}>
          {title}
        </Text>
      ) : null}
      <Box
        borderWidth={StyleSheet.hairlineWidth}
        backgroundColor='white'
        borderColor='grey'
        height={45}
        borderRadius='s'>
        <RNPicker {...rest}>{children}</RNPicker>
      </Box>
    </Box>
  )
}

export const PickerItem = RNPicker.Item
export default Picker
