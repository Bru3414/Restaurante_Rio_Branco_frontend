import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  Address,
  Cart,
  createAddressRequest,
  createOrderRequest,
  Product,
  ProductQtd,
  ProductQtdRequest,
  RequestLogin,
  RequestSignup,
  ResponseLogin
} from '../types'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('TOKEN_APLICACAO')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),
  endpoints: (builder) => ({
    buscaProdutosApi: builder.query<Product[], void>({
      query: () => '/products/isinmenu'
    }),
    signup: builder.mutation<ResponseLogin, RequestSignup>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body
      })
    }),
    login: builder.mutation<ResponseLogin, RequestLogin>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body
      })
    }),
    buscaCartApi: builder.query<Cart, void>({
      query: () => '/cart'
    }),
    includeProductInCartApi: builder.mutation<Cart, ProductQtdRequest>({
      query: (body) => ({
        url: '/cart/add',
        method: 'POST',
        body
      })
    }),
    removeProductInCardApi: builder.mutation<Cart, ProductQtd>({
      query: (body) => ({
        url: '/cart/remove',
        method: 'POST',
        body
      })
    }),
    createNewOrderApi: builder.mutation<any, createOrderRequest>({
      query: (body) => ({
        url: '/order/new-order',
        method: 'POST',
        body
      })
    }),
    findAddressApi: builder.query<Address[], void>({
      query: () => '/address'
    }),
    setAddressSelectedApi: builder.mutation<void, number>({
      query: (id) => ({
        url: `/address/set-selected/${id}`,
        method: 'PUT'
      })
    }),
    createNewAddressApi: builder.mutation<void, createAddressRequest>({
      query: (body) => ({
        url: '/address/create-new-address',
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useBuscaProdutosApiQuery,
  useSignupMutation,
  useLoginMutation,
  useBuscaCartApiQuery,
  useIncludeProductInCartApiMutation,
  useRemoveProductInCardApiMutation,
  useCreateNewOrderApiMutation,
  useFindAddressApiQuery,
  useSetAddressSelectedApiMutation,
  useCreateNewAddressApiMutation
} = api
export default api
