import { createSlice } from '@reduxjs/toolkit'

const carStore = createSlice({
  name: 'car',
  initialState: {
    carName: 'toyota',
  },
  reducers: {
    increament(state) {
      state.carName += '!'
    },
  },
})

export const { increament } = carStore.actions
export default carStore.reducer
