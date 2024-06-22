import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const userStore = createSlice({
  name: 'car',
  initialState: {
    token: '',
  },
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
      localStorage.setItem('token', action.payload)
    },
  },
})
export const { setToken } = userStore.actions
export default userStore.reducer
