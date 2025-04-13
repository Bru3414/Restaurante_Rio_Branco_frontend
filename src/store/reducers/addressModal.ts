import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Bairro, City } from '../../utils'
import { AddressSelectedResponse } from '../../types'

type addressModalState = {
  addressSelected: AddressSelectedResponse
  isOpen: boolean
}

const initialState: addressModalState = {
  addressSelected: {
    address: '',
    bairro: Bairro.JARDIM_BELA_VISTA,
    city: City.JARU_RO,
    number: '',
    complement: ''
  },
  isOpen: false
}

const addressModalSlice = createSlice({
  name: 'addressModal',
  initialState,
  reducers: {
    handleIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    setAddressSelected: (
      state,
      action: PayloadAction<AddressSelectedResponse>
    ) => {
      state.addressSelected = action.payload
    }
  }
})

export const { handleIsOpen, setAddressSelected } = addressModalSlice.actions
export default addressModalSlice.reducer
