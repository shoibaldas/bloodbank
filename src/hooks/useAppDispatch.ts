import { AppDispatch } from '@src/redux/store'
import { useDispatch } from 'react-redux'

const useAppDispatch = () => useDispatch<AppDispatch>()

export default useAppDispatch
