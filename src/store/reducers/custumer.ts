import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Customer } from '../../types'
import { Role } from '../../utils'

type userState = {
  user: Customer
}

const initialState: userState = {
  user: {
    id: -1,
    user: {
      id: -1,
      email: '',
      name: '',
      password: '',
      roles: [Role.ROLE_CUSTOMER]
    },
    cart: -1,
    phone: ''
  }
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    atualizaCustomerStore: (state, action: PayloadAction<Customer>) => {
      state.user = action.payload
    }
  }
})

export const { atualizaCustomerStore } = customerSlice.actions
export default customerSlice.reducer
