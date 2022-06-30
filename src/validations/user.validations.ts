import * as yup from 'yup'
const baseSchema = {
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be 6 character long'),
}

export const loginSchema = yup.object().shape(baseSchema)

export const signupSchema = yup.object().shape({
  ...baseSchema,
  name: yup.string().required('Name is required'),
  phone: yup
    .number()
    .required('Your mobile number is required')
    .typeError('Only enter your 11 digit number')
    .min(11, 'Phone number must be 11 digit'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password!')
    .equals([yup.ref('password')], "Passwords didn't match"),
})
