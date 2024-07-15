import { createSlice } from '@reduxjs/toolkit'

const carStore = createSlice({
  name: 'car',
  initialState: {
    isDark: false,
    carName: 'toyota',
  },
  reducers: {
    increament(state) {
      state.carName += '!'
    },
    setIsDark(state, action) {
      state.isDark = action.payload
    },
  },
})

export const { increament, setIsDark } = carStore.actions
export default carStore.reducer
