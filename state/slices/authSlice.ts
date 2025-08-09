import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type AuthState = {
  accessToken: string | null
  refreshToken: string | null
  user: UserProfile | null
  isOnboarded: boolean
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isOnboarded: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    completeOnboarding(state) {
      state.isOnboarded = true
    },
    signIn(
      state,
      action: PayloadAction<{
        accessToken: string
        refreshToken?: string
        user: UserProfile
      }>,
    ) {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken ?? null
      state.user = action.payload.user
    },
    signOut(state) {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
    },
    updateProfile(state, action: PayloadAction<Partial<UserProfile>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
  },
})

export const { completeOnboarding, signIn, signOut, updateProfile } =
  authSlice.actions
export default authSlice.reducer
