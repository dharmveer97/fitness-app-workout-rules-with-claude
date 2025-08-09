import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type PreferencesState = {
  theme: 'light' | 'dark' | 'system'
  metricUnits: boolean
}

const initialState: PreferencesState = {
  theme: 'system',
  metricUnits: true,
}

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<PreferencesState['theme']>) {
      state.theme = action.payload
    },
    setMetricUnits(state, action: PayloadAction<boolean>) {
      state.metricUnits = action.payload
    },
  },
})

export const { setTheme, setMetricUnits } = preferencesSlice.actions
export default preferencesSlice.reducer
