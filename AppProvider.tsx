import RootNavigation from '@src/navigtation/RootNavigation'
import App from './App'
import React from 'react'
import { ThemeProvider } from '@shopify/restyle'
import theme from '@src/theme'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import RNBootSplash from 'react-native-bootsplash'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@src/redux/store'

const AppProvider: React.FC = () => {
  return (
    <RootNavigation onReady={() => RNBootSplash.hide({ fade: true })}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={theme}>
            <SafeAreaProvider>
              <App />
            </SafeAreaProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </RootNavigation>
  )
}

export default AppProvider
