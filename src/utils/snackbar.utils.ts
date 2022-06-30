import palette from '@src/theme/palette'
import Snackbar, { SnackBarOptions } from 'react-native-snackbar'

export const showSuccessSnackbar = (
  text: string,
  options?: Partial<SnackBarOptions>,
) => {
  Snackbar.show({
    text,
    ...options,
    backgroundColor: palette.green,
    fontFamily: 'Poppins-Regular',
  })
}
export const showErrorSnackbar = (
  text: string,
  options?: Partial<SnackBarOptions>,
) => {
  Snackbar.show({
    text,
    ...options,
    backgroundColor: palette.red,
    fontFamily: 'Poppins-Regular',
  })
}

export const showSnackbar = (
  text: string,
  options?: Partial<SnackBarOptions>,
) => {
  Snackbar.show({
    text,
    ...options,
    fontFamily: 'Poppins-Regular',
  })
}
