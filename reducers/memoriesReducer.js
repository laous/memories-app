import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
}

export const memoriesSlice = createSlice({
  name: 'memories',
  initialState,
  reducers: {
      add : (state, action) => {
          state.list = action.payload
      }
  },
})

// Action creators are generated for each case reducer function
export const { add } = memoriesSlice.actions

export default memoriesSlice.reducer