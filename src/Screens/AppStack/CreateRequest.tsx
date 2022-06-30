import { Picker, PickerItem, TextInput } from '@src/components'
import { AppNavigationProps } from '@src/navigtation/types'
import { BloodGroup } from '@src/types/auth.types'
import {
  getErrorMessage,
  showErrorSnackbar,
  showSuccessSnackbar,
} from '@src/utils'
import { useFormik } from 'formik'
import React from 'react'
import AuthLayout from '../Authentication/AuthLayout'
import * as yup from 'yup'
import { firestoreService } from '@src/services'
import { requestCollection } from '@src/constants/collections'
import { useSelector } from 'react-redux'
import { selectUser } from '@src/redux/auth/auth.selectors'

const schema = yup.object().shape({
  phone: yup
    .number()
    .required('Contact number is required')
    .typeError('Please enter a valid number')
    .min(11, 'Number must be 11 digit'),

  address: yup.string().required('Locatin is required'),
})

const CreateRequest: React.FC<AppNavigationProps<'CreateRequest'>> = ({
  navigation,
}) => {
  const [bloodGroup, setBloodGroup] = React.useState<BloodGroup | ''>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const user = useSelector(selectUser)

  const onSubmit = async (v: any) => {
    try {
      if (!bloodGroup) {
        throw new Error('Please select blood group')
      }
      setLoading(true)
      const data = {
        ...v,
        bloodGroup,
        user,
      }
      const requestCollectionRef =
        firestoreService.getCollectionRef(requestCollection)
      await requestCollectionRef.add(data)
      resetForm()
      setBloodGroup('')
      showSuccessSnackbar('Request sent to nearest donors')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      const message = getErrorMessage(error)
      showErrorSnackbar(message)
    }
  }

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      phone: '',
      address: '',
    },
    onSubmit,
    validationSchema: schema,
  })
  return (
    <AuthLayout
      animation={require('@src/assets/animations/request.json')}
      title='Requset Blood'
      busy={loading}
      mainButtonTitle='Send Request'
      mainButtonPressed={handleSubmit}
      onBackButtonPressed={() => navigation.goBack()}>
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
        icon='phone'
        placeholder='Contact Number'
        value={values.phone}
        error={errors.phone}
        touched={touched.phone}
        onChangeText={handleChange('phone')}
        onBlur={handleBlur('phone')}
        keyboardType='number-pad'
      />
      <TextInput
        box
        icon='briefcase'
        placeholder='Patient location'
        value={values.address}
        error={errors.address}
        touched={touched.address}
        onChangeText={handleChange('address')}
        onBlur={handleBlur('address')}
      />
    </AuthLayout>
  )
}

export default CreateRequest
