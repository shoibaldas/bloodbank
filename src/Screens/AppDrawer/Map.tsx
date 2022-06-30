import { useMount } from '@src/hooks'
import { HomeNavigationProps } from '@src/navigtation/types'
import { Box } from '@src/theme'
import React from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { RoundedIconButton } from '@src/components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { selectUser } from '@src/redux/auth/auth.selectors'
import { firestoreService } from '@src/services'
import { userCollection } from '@src/constants/collections'
import { User } from '@src/types/auth.types'

const Map: React.FC<HomeNavigationProps<'Map'>> = ({ navigation }) => {
  const user = useSelector(selectUser)
  const [users, setUsers] = React.useState<User[]>([])

  const [loading, setLoading] = React.useState<boolean>(false)
  const insets = useSafeAreaInsets()

  useMount(async () => {
    try {
      setLoading(true)
      const usersRef = firestoreService.getCollectionRef(userCollection)
      const collections = await usersRef.get()
      const data = firestoreService.convertCollectionsSnapshotToMap(collections)
      setUsers(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  })
  if (!user) {
    return <Box flex={1} />
  }
  if (loading) {
    return (
      <Box flex={1} backgroundColor='background'>
        <Box zIndex={999} position='absolute' top={insets.top + 20} left={20}>
          <RoundedIconButton
            size={38}
            color='text'
            backgroundColor='background'
            name='menu'
            onPress={() => navigation.openDrawer()}
          />
        </Box>
        <Box zIndex={999} position='absolute' bottom={60} right={20}>
          <RoundedIconButton
            size={48}
            color='background'
            backgroundColor='primary'
            name='plus'
            onPress={() => navigation.navigate('CreateRequest')}
          />
        </Box>
      </Box>
    )
  }
  return (
    <Box flex={1} backgroundColor='background'>
      <Box zIndex={999} position='absolute' top={insets.top + 20} left={20}>
        <RoundedIconButton
          size={38}
          color='text'
          backgroundColor='background'
          name='menu'
          onPress={() => navigation.openDrawer()}
        />
      </Box>

      <Box zIndex={999} position='absolute' bottom={60} right={20}>
        <RoundedIconButton
          size={48}
          color='background'
          backgroundColor='primary'
          name='plus'
          onPress={() => navigation.navigate('CreateRequest')}
        />
      </Box>
      <Box style={StyleSheet.absoluteFill}>
        <MapView
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: user.location.lat,
            longitude: user.location.long,
            latitudeDelta: 0.0038,
            longitudeDelta: 0.0075,
          }}
          // initialRegion={location}

          // customMapStyle={mapStyle}
        >
          <Marker
            coordinate={{
              latitude: user.location.lat,
              longitude: user.location.long,
            }}
            flat={true}
            title='My Location'
          />
          {users.map((u) => {
            if (u.uid === user.uid) {
              return null
            }
            return (
              <Marker
                key={u.uid}
                coordinate={{
                  latitude: u.location.lat,
                  longitude: u.location.long,
                }}
                flat={true}
                title={u.name}
                description={`group: ${u.bloodGroup} ve`}
              />
            )
          })}
        </MapView>
      </Box>
    </Box>
  )
}

export default Map
