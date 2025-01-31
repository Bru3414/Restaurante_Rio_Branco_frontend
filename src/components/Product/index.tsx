import { useEffect, useState } from 'react'
import { ImageProductDB, Product as ProductDB } from '../../types'
import { Category, parseToBrl } from '../../utils'
import ModalContainer from '../ModalContainer'
import * as S from './styles'
import { RootReducer } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { atualizaCartStore, handleIsOpen } from '../../store/reducers/cart'
import { useIncludeProductInCartApiMutation } from '../../services/api'
import { useFormik } from 'formik'
import * as Yup from 'yup'

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
      isLoading: isLoadingIncludeProduct
    }
  ] = useIncludeProductInCartApiMutation()
  const { cart } = useSelector((state: RootReducer) => state.cart)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const dispatch = useDispatch()

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
    if (isVisible) {
      // Bloqueia a rolagem ao montar o componente
      document.body.style.overflow = 'hidden'
    } else {
      // Restaura a rolagem ao desmontar o componente
      document.body.style.overflow = 'auto'
    }
  }, [isVisible])

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
        obs: values.obs.toLowerCase(),
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
    </>
  )
}

export default Product
