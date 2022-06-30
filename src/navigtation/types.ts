import { CompositeNavigationProp, RouteProp } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { DrawerNavigationProp } from '@react-navigation/drawer'

export interface AppNavigationProps<RouteName extends keyof AppStackRoutes> {
  navigation: NativeStackNavigationProp<AppStackRoutes, RouteName>
  route: RouteProp<AppStackRoutes, RouteName>
}

export type AppStackRoutes = {
  Startup: undefined
  Authentication: undefined
  AppHome: undefined
  CreateRequest: undefined
}

export type AppRoutes = AppStackRoutes & AuthRoutes & HomeRoutes

export interface AuthNavigationProps<RouteName extends keyof AuthRoutes> {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<AuthRoutes, RouteName>,
    NativeStackNavigationProp<AppStackRoutes, 'Authentication'>
  >
  route: RouteProp<AuthRoutes, RouteName>
}

export type AuthRoutes = {
  Login: undefined
  Signup: undefined
  ForgetPassword: undefined
}

export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
  navigation: CompositeNavigationProp<
    DrawerNavigationProp<HomeRoutes, RouteName>,
    NativeStackNavigationProp<AppStackRoutes, 'AppHome'>
  >
  route: RouteProp<HomeRoutes, RouteName>
}

export type HomeRoutes = {
  Map: undefined
  Profile: undefined
  Requests: undefined
}
