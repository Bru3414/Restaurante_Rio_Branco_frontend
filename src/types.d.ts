import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { ListFormat } from 'typescript'
import { Bairro, City, Role } from './utils'

declare type Product = {
  id: number
  name: string
  description: string
  price: number
  image: ImageProductDB
  category: Category
}

declare type ImageProductDB = {
  id: number
  name: string
  url: string
}

declare type RequestSignup = {
  user: {
    name: string
    email: string
    password: string
  }
  address: {
    address: string
    number: string
    bairro: string
    complement: string
    city: City
  }
  phone: string
}

declare type RequestLogin = {
  username: string
  password: string
}

declare type ResponseLogin = {
  token: string
  id: number
  name: string
  email: string
  roles: Role[]
  type: string
}

declare type User = {
  id: number
  name: string
  email: string
  password: string
  roles: Role[]
}

declare type ProductQtd = {
  id: number
  product: Product
  quantity: number
  cart: Cart.id
  obs?: string
  price: number
}

declare type Cart = {
  id: number
  customer: Customer.id
  products: ProductQtd[]
}

declare type Customer = {
  id: number
  user: User
  phone: string
  cart: Cart.id
}

declare type Address = {
  id?: number
  address: string
  number: string
  bairro: Bairro
  complement?: string
  city: City
  customer: Customer.id
}

declare type Error = {
  path: string
  error: string
  message: string
  timestamp: number
  status: number
}

type ApiError = FetchBaseQueryError & {
  data?: Error
}
