import { configureStore } from '@reduxjs/toolkit'
import productMenuReducer from './reducers/productMenu'
import api from '../services/api'

export const store = configureStore({
  reducer: {
    productMenu: productMenuReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>
