import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type userState = {
  token: string
}

const initialState: userState = {
  token: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    atualizaTokenStore: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem('TOKEN_APLICACAO', action.payload)
    },
    deleteTokenStore: (state) => {
      state.token = ''
      localStorage.removeItem('TOKEN_APLICACAO')
    }
  }
})

export const { atualizaTokenStore, deleteTokenStore } = userSlice.actions
export default userSlice.reducer
