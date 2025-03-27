import { useDispatch, useSelector } from 'react-redux'
import * as S from './styles'
import { RootReducer } from '../../store'
import { handleIsOpen } from '../../store/reducers/cart'
import { useEffect, useState } from 'react'
import { parseToBrl } from '../../utils'
import { Button } from '../Login/styles'
import ProductsCart from '../ProductsCart'

const Cart = () => {
  const { cart: cartStore, isOpen } = useSelector(
    (state: RootReducer) => state.cart
  )
  const dispatch = useDispatch()

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
    return (
      <S.CartDiv>
        <S.CardDivGap>
          <h2>Seu pedido</h2>
          {cartStore.products.length >= 1 ? (
            <ProductsCart />
          ) : (
            <>Nenhum produto no carrinho</>
          )}
        </S.CardDivGap>
        <S.FinalizarDiv>
          <S.ValorTotal>
            <span>Subtotal</span>
            <span>{getTotalValor()}</span>
          </S.ValorTotal>
          <S.ButtonCheckout
            onClick={() => dispatch(handleIsOpen(false))}
            to={'/checkout'}
          >
            Avançar pedido
          </S.ButtonCheckout>
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
    </>
  )
}

export default Cart
