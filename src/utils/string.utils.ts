export const getErrorMessage = (error: any) => {
  if (error?.response?.data?.msg) {
    return error?.response?.data?.msg
  } else if (error.message === 'Network Error') {
    return 'Please check your internet connection!'
  } else if (error?.message) {
    return error.message
  } else {
    return 'Something went wrong!'
  }
}
