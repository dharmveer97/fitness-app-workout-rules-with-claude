import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import { securePersistStorage } from './securePersistStorage'
import authReducer from './slices/authSlice'
import onboardingReducer from './slices/onboardingSlice'
import preferencesReducer from './slices/preferencesSlice'

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['preferences'],
}

const authPersistConfig = {
  key: 'auth',
  storage: securePersistStorage,
  whitelist: ['accessToken', 'refreshToken', 'user', 'isOnboarded'],
}

const onboardingPersistConfig = {
  key: 'onboarding',
  storage: securePersistStorage,
  whitelist: ['isOnboardingCompleted', 'personalInfo', 'goals', 'preferences'],
  blacklist: ['_hasHydrated', 'isLoading', 'error', 'analytics'],
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  preferences: preferencesReducer,
  onboarding: persistReducer(onboardingPersistConfig, onboardingReducer),
})

// Configure store with proper middleware settings according to Redux Toolkit docs
export const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['register', 'rehydrate'],
      },
      // Prevent "A non-serializable value was detected" warnings for dates
      immutableCheck: {
        warnAfter: 128,
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
