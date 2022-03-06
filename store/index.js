import { configureStore } from '@reduxjs/toolkit'
import memoriesReducer from '../reducers/memoriesReducer'

export const store = configureStore({
  reducer: {
      memories : memoriesReducer
  },
})