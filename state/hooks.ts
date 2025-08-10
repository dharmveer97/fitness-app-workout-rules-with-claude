import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux'

import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// This provides proper TypeScript typing according to Redux Toolkit docs
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
