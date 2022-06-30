import { Spacer } from '@src/components'
import { Card, Text, TouchBox } from '@src/theme'
import { BloodRequest } from '@src/types/request.types'
import { fp } from '@src/utils'
import React from 'react'
import { Linking } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

export interface RequestItemProps {
  req: BloodRequest
}

const RequestItem: React.FC<RequestItemProps> = ({ req }) => {
  return (
    <Card variant='elevated'>
      <Text color='danger' fontSize={fp(3)} variant='logo'>
        {req.bloodGroup}
      </Text>
      <Text variant='subtitle' textAlign='center'>
        Blood needed
      </Text>
      <Spacer space='medium' />
      <Text variant='button' color='text'>
        <Icon name='map-pin' /> {req.address}
      </Text>
      <TouchBox onPress={() => Linking.openURL(`tel:${req.phone}`)}>
        <Text variant='button' color='text'>
          <Icon name='phone' /> {req.phone}
        </Text>
      </TouchBox>
    </Card>
  )
}

export default RequestItem
