import { PermissionsAndroid, Platform } from 'react-native'
import Geo from 'react-native-geolocation-service'

class _GeoService {
  async requestPermission() {
    if (Platform.OS === 'ios') {
      await Geo.requestAuthorization('whenInUse')
    } else if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Blood Book',
          message: 'Blood Book needs your location',
          buttonPositive: 'Allow',
        },
      )
    }
  }

  getCurrentPosition(): Promise<Geo.GeoPosition> {
    return new Promise((resolve, reject) => {
      Geo.getCurrentPosition(
        (val) => {
          resolve(val)
        },
        (error) => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          forceRequestLocation: true,
        },
      )
    })
  }
}

const geoService = new _GeoService()

export default geoService
