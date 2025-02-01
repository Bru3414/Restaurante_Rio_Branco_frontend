import { useEffect, useState } from 'react'
import { ApiError, ImageProductDB, Product as ProductDB } from '../../types'
import { Category, parseToBrl } from '../../utils'
import ModalContainer from '../ModalContainer'
import * as S from './styles'
import { RootReducer } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { atualizaCartStore, handleIsOpen } from '../../store/reducers/cart'
import { useIncludeProductInCartApiMutation } from '../../services/api'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Loader from '../Loader'
import { clearError, setError } from '../../store/reducers/error'
import { Navigate } from 'react-router-dom'

const Product = ({
  image,
  name,
  description,
  price,
  category,
  id
}: ProductDB) => {
  const [
    includeProduct,
    {
      data: cartInclude,
      isSuccess: isSuccessIncludeProduct,
      isLoading: isLoadingIncludeProduct,
      isError: isErrorIncludeProduct,
      error
    }
  ] = useIncludeProductInCartApiMutation()
  const { cart } = useSelector((state: RootReducer) => state.cart)
  const { error: errorStore } = useSelector((state: RootReducer) => state.error)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isVisible) {
      // Bloqueia a rolagem ao montar o componente
      document.body.style.overflow = 'hidden'
    } else {
      // Restaura a rolagem ao desmontar o componente
      document.body.style.overflow = 'auto'
    }
  }, [isVisible])

  useEffect(() => {
    if (cartInclude) {
      dispatch(
        atualizaCartStore({
          customer: cartInclude.customer,
          id: cartInclude.id,
          products: cartInclude.products
        })
      )
      setIsVisible(false)
      dispatch(handleIsOpen(true))
    }
  }, [isSuccessIncludeProduct])

  useEffect(() => {
    if (error) {
      const apiError = error as ApiError
      if (apiError.data) {
        dispatch(
          setError({
            error: apiError.data?.error,
            message: apiError.data?.message,
            path: apiError.data?.path,
            status: apiError.data?.status,
            timestamp: apiError.data?.timestamp
          })
        )
      }
    }
  }, [isErrorIncludeProduct])

  const form = useFormik({
    initialValues: {
      obs: ''
    },
    validationSchema: Yup.object({
      obs: Yup.string().max(100, 'Máximo de 100 caracteres')
    }),
    onSubmit: (values) => {
      includeProduct({
        cart: cart,
        id: -1,
        quantity: 1,
        obs: values.obs.toLowerCase().trim(),
        price: price,
        product: {
          category: category,
          description: description,
          id: id,
          name: name,
          price: price,
          image: {
            id: image.id,
            name: image.name,
            url: image.url
          }
        }
      })
    }
  })

  if (
    errorStore.message ===
    'Full authentication is required to access this resource'
  ) {
    console.log(errorStore.message)
    return <Navigate to={'/signin'} />
  }

  return (
    <>
      <S.Card onClick={() => setIsVisible(true)}>
        <div>
          <img src={image.url} alt={image.name} />
          <h4>{name}</h4>
          <p>{description}</p>
        </div>
        <span>{parseToBrl(price)}</span>
      </S.Card>
      <ModalContainer isVisible={isVisible} onClick={() => setIsVisible(false)}>
        <S.ModalContent>
          <S.Card>
            <div>
              <img src={image.url} alt={image.name} />
              <h4>{name}</h4>
              <p>{description}</p>
            </div>
            <span>{parseToBrl(price)}</span>
          </S.Card>
          <S.TextButtonDiv onSubmit={form.handleSubmit}>
            <textarea
              placeholder="Obs; Ex: sem macarrão, sem feijão, etc..."
              name="obs"
              value={form.values.obs}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            ></textarea>
            <div>
              <button type="submit">Adicionar ao pedido</button>
              <button type="button" onClick={() => setIsVisible(false)}>
                cancelar
              </button>
            </div>
          </S.TextButtonDiv>
        </S.ModalContent>
      </ModalContainer>
      <Loader isVisible={isLoadingIncludeProduct} />
    </>
  )
}

export default Product
