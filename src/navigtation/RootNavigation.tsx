import React from 'react'
import {
  NavigationContainer,
  NavigationContainerProps,
  NavigationContainerRef,
} from '@react-navigation/native'
import { AppRoutes } from './types'

export interface RootNavigationProps extends NavigationContainerProps {
  children: React.ReactNode
  onReady?: () => void
}

export function navigate(name: keyof AppRoutes, params: any) {
  if (rootNavRef.current) {
    rootNavRef.current.navigate(name, params)
  } else {
  }
}

export const rootNavRef = React.createRef<NavigationContainerRef<AppRoutes>>()

const RootNavigation = ({
  children,
  onReady,
  ...props
}: RootNavigationProps) => {
  return (
    <NavigationContainer onReady={onReady} ref={rootNavRef} {...props}>
      {children}
    </NavigationContainer>
  )
}

export default RootNavigation
