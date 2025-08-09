import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './slices/authSlice';
import preferencesReducer from './slices/preferencesSlice';
import { securePersistStorage } from './securePersistStorage';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['preferences'],
};

const authPersistConfig = {
  key: 'auth',
  storage: securePersistStorage,
  whitelist: ['accessToken', 'refreshToken', 'user', 'isOnboarded'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  preferences: preferencesReducer,
});

export const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
