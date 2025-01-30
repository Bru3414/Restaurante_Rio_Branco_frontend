declare type Product = {
  id: number
  name: string
  description: string
  price: number
  isInMenu: boolean
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
  roles: ListFormat
  type: string
}
