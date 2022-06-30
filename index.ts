import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import { enableScreens } from 'react-native-screens'
import { name as appName } from './app.json'
import AppProvider from './AppProvider'

enableScreens()

AppRegistry.registerComponent(appName, () => AppProvider)
