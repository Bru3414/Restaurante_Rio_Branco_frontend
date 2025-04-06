import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const addressModalSlice = createSlice({
  name: 'addressModal',
  initialState: {
    isOpen: false
  },
  reducers: {
    handleIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    }
  }
})

export const { handleIsOpen } = addressModalSlice.actions
export default addressModalSlice.reducer
