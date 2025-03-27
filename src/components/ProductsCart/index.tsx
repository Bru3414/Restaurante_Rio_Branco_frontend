import { useDispatch, useSelector } from 'react-redux'
import {
  useBuscaCartApiQuery,
  useCreateNewOrderApiMutation,
  useIncludeProductInCartApiMutation,
  useRemoveProductInCardApiMutation
} from '../../services/api'
import { parseToBrl } from '../../utils'
import * as S from './styles'
import { RootReducer } from '../../store'
import { useEffect } from 'react'
import { atualizaCartStore } from '../../store/reducers/cart'
import Loader from '../Loader'

const ProductsCart = () => {
  const {
    data: cart,
    isSuccess: isSuccessBuscaCart,
    isLoading: isLoadingBuscaCart,
    refetch: refetchBuscaCart
  } = useBuscaCartApiQuery()
  const [
    includeProduct,
    {
      data: cartInclude,
      isSuccess: isSuccessIncludeProduct,
      isLoading: isLoadingIncludeProduct
    }
  ] = useIncludeProductInCartApiMutation()
  const [
    removeProduct,
    {
      data: cardRemove,
      isSuccess: isSuccessRemoveProduct,
      isLoading: isLoadingRemoveProduct
    }
  ] = useRemoveProductInCardApiMutation()
  const [
    createNewOrder,
    {
      data: dataNewOrder,
      isSuccess: isSuccessCreateNewOrder,
      isLoading: isLoadingCreateNewOrder
    }
  ] = useCreateNewOrderApiMutation()
  const { cart: cartStore, isOpen } = useSelector(
    (state: RootReducer) => state.cart
  )
  const dispatch = useDispatch()

  useEffect(() => {
    refetchBuscaCart()
  }, [])

  useEffect(() => {
    if (cart && isSuccessBuscaCart) {
      dispatch(
        atualizaCartStore({
          customer: cart.customer,
          id: cart.id,
          products: cart.products
        })
      )
    }
  }, [isSuccessBuscaCart, cart])

  useEffect(() => {
    if (cartInclude) {
      dispatch(
        atualizaCartStore({
          customer: cartInclude.customer,
          id: cartInclude.id,
          products: cartInclude.products
        })
      )
    }
  }, [isSuccessIncludeProduct])

  useEffect(() => {
    if (cardRemove) {
      dispatch(
        atualizaCartStore({
          customer: cardRemove.customer,
          id: cardRemove.id,
          products: cardRemove.products
        })
      )
    }
  }, [isSuccessRemoveProduct])

  useEffect(() => {
    if (dataNewOrder) {
      console.log(dataNewOrder)
    }
  }, [isSuccessCreateNewOrder])

  useEffect(() => {
    if (isOpen) {
      // Bloqueia a rolagem ao montar o componente
      document.body.style.overflow = 'hidden'
    } else {
      // Restaura a rolagem ao desmontar o componente
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const renderizaProdutosCart = (): JSX.Element => {
    return (
      <div>
        {[...cartStore.products]
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <S.CardProduto key={item.id}>
              <img src={item.product.image.url} alt={item.product.image.url} />
              <div>
                <h3>{item.product.name}</h3>
                <p>{item.product.description}</p>
                {item.obs && (
                  <p>
                    <b>Obs:</b> {item.obs}
                  </p>
                )}
                <S.Price>{parseToBrl(item.price)}</S.Price>
              </div>
              <S.QtdProdutos>
                <span
                  onClick={() =>
                    removeProduct({
                      cart: cart,
                      id: item.id,
                      product: item.product,
                      quantity: 0,
                      obs: item.obs,
                      price: item.product.price
                    })
                  }
                >
                  -
                </span>
                <input disabled={true} type="text" value={item.quantity} />
                <span
                  onClick={() =>
                    includeProduct({
                      productId: item.product.id,
                      quantity: 0,
                      obs: item.obs
                    })
                  }
                >
                  +
                </span>
              </S.QtdProdutos>
            </S.CardProduto>
          ))}
      </div>
    )
  }

  return (
    <>
      {renderizaProdutosCart()}
      <Loader
        isVisible={
          isLoadingBuscaCart ||
          isLoadingIncludeProduct ||
          isLoadingRemoveProduct
        }
      />
    </>
  )
}

export default ProductsCart
