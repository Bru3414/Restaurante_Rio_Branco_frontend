import { configureStore } from '@reduxjs/toolkit'
import productMenuReducer from './reducers/productMenu'
import customerReducer from './reducers/custumer'
import userReducer from './reducers/user'
import cartReducer from './reducers/cart'
import errorReducer from './reducers/error'
import api from '../services/api'

export const store = configureStore({
  reducer: {
    productMenu: productMenuReducer,
    customer: customerReducer,
    user: userReducer,
    cart: cartReducer,
    error: errorReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>
