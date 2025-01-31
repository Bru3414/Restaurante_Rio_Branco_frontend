import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cart, ProductQtd } from '../../types'

type cartState = {
  cart: Cart
  isOpen: boolean
}

const initialState: cartState = {
  cart: {
    id: -1,
    customer: -1,
    products: []
  },
  isOpen: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    handleIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    atualizaCartStore: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload
    },
    addProductCartStore: (state, action: PayloadAction<ProductQtd>) => {
      let hasInCart = false
      for (let i = 0; i < state.cart.products.length; i++) {
        if (
          state.cart.products[i].product === action.payload.product &&
          state.cart.products[i].obs === action.payload.obs
        ) {
          state.cart.products[i].quantity++
          hasInCart = true
          break
        }
      }

      if (!hasInCart) {
        state.cart.products.push(action.payload)
      }
    },
    removeProductCartStore: (state, action: PayloadAction<ProductQtd>) => {
      for (let i = 0; i < state.cart.products.length; i++) {
        if (
          state.cart.products[i].product === action.payload.product &&
          state.cart.products[i].obs === action.payload.obs
        ) {
          state.cart.products[i].quantity--

          if (state.cart.products[i].quantity <= 0) {
            state.cart.products = state.cart.products.filter(
              (item) => item.id !== action.payload.product.id
            )
          }
          break
        }
      }
    }
  }
})

export const {
  handleIsOpen,
  addProductCartStore,
  atualizaCartStore,
  removeProductCartStore
} = cartSlice.actions
export default cartSlice.reducer
