import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../types'

type ProductMenuState = {
  items: Product[]
}

const initialState: ProductMenuState = {
  items: []
}

const productMenuSlice = createSlice({
  name: 'productMenu',
  initialState,
  reducers: {
    atualizaProdutosStore: (state, action: PayloadAction<Product[]>) => {
      state.items = []

      action.payload.forEach((item) => state.items.push(item))
    }
  }
})

export const { atualizaProdutosStore } = productMenuSlice.actions
export default productMenuSlice.reducer
