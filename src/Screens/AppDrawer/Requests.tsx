import React from 'react'
import { HomeNavigationProps } from '@src/navigtation/types'
import { Container, Header, RoundedIconButton } from '@src/components'
import { Box } from '@src/theme'
import { BloodRequest } from '@src/types/request.types'
import { useMount } from '@src/hooks'
import { getErrorMessage, showErrorSnackbar } from '@src/utils'
import { firestoreService } from '@src/services'
import { requestCollection } from '@src/constants/collections'
import { FlatList, RefreshControl } from 'react-native'
import RequestItem from './RequestItem'
import OverLayLoader from '@src/components/OverLayLoader'

const Requests: React.FC<HomeNavigationProps<'Requests'>> = ({
  navigation,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [reqs, setReqs] = React.useState<BloodRequest[]>([])

  const loadReqs = async () => {
    try {
      setLoading(true)
      const reqsCollectionRef =
        firestoreService.getCollectionRef(requestCollection)
      const reqsSnap = await reqsCollectionRef.get()
      const data = firestoreService.convertCollectionsSnapshotToMap(reqsSnap)
      setReqs(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      const message = getErrorMessage(error)
      showErrorSnackbar(message)
    }
  }

  useMount(() => {
    loadReqs()
  })
  if (loading) {
    return (
      <Container>
        <Header
          left={{ icon: 'menu', onPress: () => navigation.openDrawer() }}
          title='Blood Requests'
        />
        <Box flex={1} backgroundColor='background'>
          <OverLayLoader />
          <Box zIndex={999} position='absolute' bottom={20} right={20}>
            <RoundedIconButton
              size={48}
              color='background'
              backgroundColor='primary'
              name='plus'
              onPress={() => navigation.navigate('CreateRequest')}
            />
          </Box>
        </Box>
      </Container>
    )
  }

  return (
    <Container>
      <Header
        left={{ icon: 'menu', onPress: () => navigation.openDrawer() }}
        title='Blood Requests'
      />
      <Box zIndex={999} position='absolute' bottom={20} right={20}>
        <RoundedIconButton
          size={48}
          color='background'
          backgroundColor='primary'
          name='plus'
          onPress={() => navigation.navigate('CreateRequest')}
        />
      </Box>
      <Box
        flex={1}
        backgroundColor='background'
        paddingHorizontal='s'
        paddingVertical='s'>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={loadReqs} />
          }
          data={reqs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RequestItem req={item} />}
        />
      </Box>
    </Container>
  )
}

export default Requests
