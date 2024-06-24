import { configureStore } from '@reduxjs/toolkit'
import carReducer from './modules/carStore'
import userStore from './modules/userStore'

const store = configureStore({
  reducer: {
    car: carReducer,
    user: userStore,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
