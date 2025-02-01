import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Error } from '../../types'

type ErrorState = {
  error: Error
}

const initialState: ErrorState = {
  error: {
    error: '',
    message: '',
    path: '',
    status: 0,
    timestamp: 0
  }
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = {
        error: '',
        message: '',
        path: '',
        status: 0,
        timestamp: 0
      }
    }
  }
})

export const { setError, clearError } = errorSlice.actions
export default errorSlice.reducer
