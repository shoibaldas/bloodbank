import { fp } from '@src/utils'

const textVariants = {
  body: {
    fontSize: fp(1.8),
    fontFamily: 'Poppins-Regular',
    color: 'text',
  },
  button: {
    fontSize: fp(2),
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  title: {
    fontSize: fp(2.2),
    fontFamily: 'Poppins-Medium',
  },
  subtitle: {
    fontSize: fp(1.7),
    color: 'darkGrey',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
  },
  sectiontitle: {
    fontSize: fp(2.2),
    fontFamily: 'Poppins-Bold',
    color: 'text',
  },
  nodata: {
    fontSize: fp(2),
    fontFamily: 'Poppins-Regular',
    color: 'grey',
  },
  logo: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: fp(2.3),
  },
  inputlabel: {
    fontSize: fp(2),
    fontFamily: 'Poppins-Bold',
  },
  error: {
    fontFamily: 'Poppins-Thin',
    color: 'danger',
    fontSize: fp(1.8),
  },
}

export default textVariants
