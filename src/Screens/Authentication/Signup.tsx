import { TextInput, Picker, PickerItem } from '@src/components'
import { AuthNavigationProps } from '@src/navigtation/types'
import React from 'react'
import AuthLayout from './AuthLayout'
import { useFormik } from 'formik'
import { signupSchema } from '@src/validations/user.validations'
import { useSelector } from 'react-redux'
import { selectIsSignupIn, selectUser } from '@src/redux/auth/auth.selectors'
import { signupAsync } from '@src/redux/auth/auth.async'
import { useAppDispatch } from '@src/hooks'
import { BloodGroup } from '@src/types/auth.types'
import { showErrorSnackbar } from '@src/utils'

export interface LoginProps {}

const initialValues = {
  email: '',
  password: '',
  name: '',
  phone: '',
  confirmPassword: '',
}

const Signup: React.FC<AuthNavigationProps<'Login'>> = ({ navigation }) => {
  const loading = useSelector(selectIsSignupIn)
  const user = useSelector(selectUser)
  const dispatch = useAppDispatch()
  const [bloodGroup, setBloodGroup] = React.useState<BloodGroup | ''>('')

  const onSubmit = (v: typeof initialValues) => {
    if (!bloodGroup) {
      showErrorSnackbar('Please select blood group')
      return
    }
    const data = {
      ...v,
      bloodGroup,
    }
    dispatch(signupAsync(data))
  }
  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema: signupSchema,
    })

  React.useEffect(() => {
    if (user && !loading) {
      navigation.replace('AppHome')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading])
  return (
    <AuthLayout
      mainButtonTitle='Signup'
      mainButtonPressed={handleSubmit}
      onBackButtonPressed={() => navigation.goBack()}
      onSignupPressed={() => navigation.navigate('Login')}
      signUpTitle='Have an account? Login'
      onForgotPassword={() => navigation.navigate('ForgetPassword')}
      busy={loading}
      title='Signup'>
      <TextInput
        box
        icon='user'
        placeholder='Your Name'
        value={values.name}
        touched={touched.name}
        error={errors.name}
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
      />
      <TextInput
        box
        icon='phone'
        placeholder='Your Mobile Number'
        value={values.phone}
        touched={touched.phone}
        error={errors.phone}
        onChangeText={handleChange('phone')}
        onBlur={handleBlur('phone')}
        keyboardType='number-pad'
      />
      <Picker
        selectedValue={bloodGroup}
        mode='dropdown'
        onValueChange={(v) => setBloodGroup(v as any)}>
        <PickerItem value='' label='Select Blood Group' />
        <PickerItem value='A-' label='A- ve' />
        <PickerItem value='A+' label='A+ ve' />
        <PickerItem value='B+' label='B+ ve' />
        <PickerItem value='B-' label='B- ve' />
        <PickerItem value='O+' label='O+ ve' />
        <PickerItem value='O-' label='O- ve' />
        <PickerItem value='AB+' label='AB+ ve' />
        <PickerItem value='AB-' label='AB- ve' />
      </Picker>
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
      <TextInput
        box
        icon='lock'
        placeholder='Your Password'
        password
        value={values.password}
        touched={touched.password}
        error={errors.password}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        autoCapitalize='none'
      />
      <TextInput
        box
        icon='lock'
        placeholder='Confirm Password'
        password
        value={values.confirmPassword}
        touched={touched.confirmPassword}
        error={errors.confirmPassword}
        onChangeText={handleChange('confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        autoCapitalize='none'
      />
    </AuthLayout>
  )
}

export default Signup
