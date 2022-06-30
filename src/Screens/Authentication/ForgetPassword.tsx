import { TextInput } from '@src/components'
import { AuthNavigationProps } from '@src/navigtation/types'
import React from 'react'
import AuthLayout from './AuthLayout'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  getErrorMessage,
  showErrorSnackbar,
  showSuccessSnackbar,
} from '@src/utils'
import { authService } from '@src/services'

export interface LoginProps {}

const ForgetPassword: React.FC<AuthNavigationProps<'ForgetPassword'>> = ({
  navigation,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const onSubmit = async (v: { email: string }) => {
    try {
      setLoading(true)
      await authService.sendForgetPassMail(v.email)
      showSuccessSnackbar('Reset link sent to your email', {
        action: {
          text: 'Login',
          textColor: 'white',
          onPress: () => navigation.navigate('Login'),
        },
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      const message = getErrorMessage(error)
      showErrorSnackbar(message)
    }
  }
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        email: '',
      },
      onSubmit,
      validationSchema: yup.object().shape({
        email: yup
          .string()
          .email('Please enter a valid email')
          .required('Email is required'),
      }),
    })
  return (
    <AuthLayout
      mainButtonTitle='Send Link'
      onBackButtonPressed={() => navigation.goBack()}
      mainButtonPressed={handleSubmit}
      onSignupPressed={() => navigation.navigate('Login')}
      signUpTitle='Have an account? Login'
      animation={require('@src/assets/animations/forgetpass.json')}
      title='Forget Password'
      busy={loading}>
      <TextInput
        box
        icon='mail'
        placeholder='Your Email'
        value={values.email}
        touched={touched.email}
        error={errors.email}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        keyboardType='email-address'
        autoCapitalize='none'
      />
    </AuthLayout>
  )
}

export default ForgetPassword
