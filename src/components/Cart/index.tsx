import { useDispatch, useSelector } from 'react-redux'
import * as S from './styles'
import { RootReducer } from '../../store'
import {
  addProductCartStore,
  atualizaCartStore,
  handleIsOpen
} from '../../store/reducers/cart'
import { useEffect, useState } from 'react'
import {
  useBuscaCartApiQuery,
  useIncludeProductInCartApiMutation,
  useRemoveProductInCardApiMutation
} from '../../services/api'
import { parseToBrl } from '../../utils'
import Loader from '../Loader'
import { Button } from '../Login/styles'

const Cart = () => {
  const {
    data: cart,
    isSuccess: isSuccessBuscaCart,
    isLoading: isLoadingBuscaCart
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
  const { cart: cartStore, isOpen } = useSelector(
    (state: RootReducer) => state.cart
  )
  const dispatch = useDispatch()
  const [totalValor, setTotalValor] = useState(0)

  useEffect(() => {
    if (cart) {
      dispatch(
        atualizaCartStore({
          customer: cart.customer,
          id: cart.id,
          products: cart.products
        })
      )
    }
  }, [isSuccessBuscaCart])

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
    if (isOpen) {
      // Bloqueia a rolagem ao montar o componente
      document.body.style.overflow = 'hidden'
    } else {
      // Restaura a rolagem ao desmontar o componente
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const getTotalValor = (): string => {
    let valor = 0
    cartStore.products.forEach((item) => {
      valor += item.price
    })
    return parseToBrl(valor)
  }

  const renderizaProdutosCart = (): JSX.Element => {
    // eslint-disable-next-line prefer-const
    const sortedProducts = [...cartStore.products].sort((a, b) => a.id - b.id)

    return (
      <S.CartDiv>
        <S.CardDivGap>
          <h2>Seu pedido</h2>
          {cartStore.products.length >= 1 ? (
            sortedProducts.map((item) => (
              <S.CardProduto key={item.id}>
                <img
                  src={item.product.image.url}
                  alt={item.product.image.url}
                />
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
                        cart: cart,
                        id: item.id,
                        product: item.product,
                        quantity: 0,
                        obs: item.obs,
                        price: item.product.price
                      })
                    }
                  >
                    +
                  </span>
                </S.QtdProdutos>
              </S.CardProduto>
            ))
          ) : (
            <>Nenhum produto no carrinho</>
          )}
        </S.CardDivGap>
        <S.FinalizarDiv>
          <S.ValorTotal>
            <span>Total</span>
            <span>{getTotalValor()}</span>
          </S.ValorTotal>
          <Button>Avançar pedido</Button>
          <Button>Continuar comprando</Button>
        </S.FinalizarDiv>
      </S.CartDiv>
    )
  }

  return (
    <>
      <S.ModalContainerCart
        className={`${isOpen ? 'visible' : ''}`}
        onClick={() => console.log()}
      >
        {renderizaProdutosCart()}

        <div
          className="overlay"
          onClick={() => dispatch(handleIsOpen(false))}
        />
      </S.ModalContainerCart>
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

export default Cart
