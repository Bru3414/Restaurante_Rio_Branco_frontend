import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResponseLogin } from '../../types'

type userState = {
  user: ResponseLogin
}

const initialState: userState = {
  user: {
    email: '',
    id: -1,
    name: '',
    roles: [],
    token: '',
    type: ''
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    atualizaUserStore: (state, action: PayloadAction<ResponseLogin>) => {
      state.user = action.payload
      localStorage.setItem('TOKEN_APLICACAO', action.payload.token)
      localStorage.setItem('USER_ID', action.payload.id.toString())
    }
  }
})

export const { atualizaUserStore } = userSlice.actions
export default userSlice.reducer
