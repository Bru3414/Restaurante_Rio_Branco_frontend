import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import * as Yup from 'yup'
import * as S from './styles'
import ProductsCart from '../ProductsCart'
import { useFormik } from 'formik'
import { parseToBrl } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AddressModal from '../AddressModal'
import {
  useCreateNewOrderApiMutation,
  useFindAddressApiQuery
} from '../../services/api'
import { Address } from '../../types'
import Loader from '../Loader'
import {
  handleIsOpen,
  setAddressSelected
} from '../../store/reducers/addressModal'

const Checkout = () => {
  const {
    data: address,
    isLoading: isLoadingAddress,
    isSuccess: isSuccessAddress,
    refetch: refetchFindAddress
  } = useFindAddressApiQuery()
  const [
    createNewOrderApi,
    { isSuccess: isSuccessCreateNewOrder, isLoading: isLoadingCreateNewOrder }
  ] = useCreateNewOrderApiMutation()
  const { cart: cartStore, isOpen } = useSelector(
    (state: RootReducer) => state.cart
  )
  const { isOpen: isOpenAddressModal, addressSelected } = useSelector(
    (state: RootReducer) => state.addressModal
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isSuccessCreateNewOrder) {
      navigate('/')
    }
  }, [isSuccessCreateNewOrder])

  useEffect(() => {
    if (!isOpenAddressModal) {
      refetchFindAddress()
      console.log('testwe')
    }
  }, [isOpenAddressModal])

  useEffect(() => {
    if (isSuccessAddress) {
      const addressSelected = address.find((item) => item.isSelected === true)
      if (addressSelected) {
        dispatch(
          setAddressSelected({
            address: addressSelected.address,
            bairro: addressSelected.bairro,
            city: addressSelected.city,
            number: addressSelected.number,
            complement: addressSelected.complement
          })
        )
      }
    }
  }, [isSuccessAddress])

  const form = useFormik({
    initialValues: {
      delivery: '',
      payment: '',
      troco: ''
    },
    validationSchema: Yup.object({
      delivery: Yup.string().required('Escolha a forma de entrega'),
      payment: Yup.string().required('Escolha uma forma de pagamento'),
      troco: Yup.string().max(40, 'Tamanho máximo excedido')
    }),
    onSubmit: (values) => {
      createNewOrderApi({
        typeDelivery: values.delivery,
        payment: values.payment,
        troco: values.troco
      })
    }
  })

  const confirmaPedido = () => {
    if (form.values.delivery === 'LOCAL') {
      form.values.payment = 'LOCAL'
    }
    form.handleSubmit
  }

  const getErrorMessageEntrega = (fieldName: string, message?: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors

    if (isInvalid && isTouched) {
      return message
    }
    return ''
  }

  const getTotalValor = (n: number): string => {
    let valor = 0
    cartStore.products.forEach((item) => {
      valor += item.price
    })
    return parseToBrl(valor + n)
  }

  return (
    <>
      <S.CheckoutDiv className="container">
        <h2>Revisão do pedido</h2>
        <ProductsCart />
        <S.Form onSubmit={form.handleSubmit}>
          <S.TypeDeliveryPaymentDiv>
            <h2>Entrega</h2>
            <select
              name="delivery"
              id="delivery"
              value={form.values.delivery}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            >
              <option value="">--- Selecione a forma de entrega ---</option>
              <option value="DELIVERY">Entrega em domicílio</option>
              <option value="LOCAL">Retirada no local</option>
            </select>
            <S.Error>
              {getErrorMessageEntrega('delivery', form.errors.delivery)}
            </S.Error>
          </S.TypeDeliveryPaymentDiv>
          <S.AddressDiv>
            {form.values.delivery == 'DELIVERY' ? (
              <>
                <h3>Confirme o local de entrega:</h3>
                <p>
                  {addressSelected?.address}, nº {addressSelected?.number} -{' '}
                  {addressSelected?.bairro.replaceAll('_', ' ')} -{' '}
                  {addressSelected?.city.replace('_', '/')}
                  {addressSelected?.complement &&
                    ` (${addressSelected.complement})`}
                </p>
                <button
                  type="button"
                  onClick={() => dispatch(handleIsOpen(true))}
                >
                  Trocar endereço
                </button>
              </>
            ) : (
              <p>Endereço: Restaurante</p>
            )}
          </S.AddressDiv>
          <S.TypeDeliveryPaymentDiv>
            <h2>Forma de pagamento</h2>
            {form.values.delivery == 'DELIVERY' ? (
              <>
                <select
                  name="payment"
                  id="payment"
                  value={form.values.payment}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                >
                  <option value="">
                    --- Selecione a forma de pagamento ---
                  </option>
                  <option value="DINHEIRO">Dinheiro (Entregador)</option>
                  <option value="CARTAO">Cartão (Entregador)</option>
                  <option value="PIX">PIX</option>
                </select>
                <S.Error>
                  {getErrorMessageEntrega('payment', form.errors.payment)}
                </S.Error>
              </>
            ) : (
              <p>Pagamento no local</p>
            )}
          </S.TypeDeliveryPaymentDiv>
          {form.values.payment == 'DINHEIRO' &&
            form.values.delivery != 'LOCAL' && (
              <S.Troco>
                <h3>Precisa de troco?</h3>
                <input
                  name="troco"
                  value={form.values.troco}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  type="text"
                  placeholder="Exemplo: Troco para R$ 100,00"
                />
                <S.Error>
                  {getErrorMessageEntrega('troco', form.errors.troco)}
                </S.Error>
              </S.Troco>
            )}
          <S.AmountDiv>
            <S.Amount>
              <span className="dotted-text">Subtotal:</span>
              <span>{getTotalValor(0)}</span>
            </S.Amount>
            {form.values.delivery == 'DELIVERY' && (
              <S.Amount>
                <span className="dotted-text">Taxa de entrega:</span>
                <span>R$ 7,00</span>
              </S.Amount>
            )}
            <span className="dotted"></span>
            <S.Amount>
              <span className="dotted-text">Total do pedido:</span>
              <span>{getTotalValor(7)}</span>
            </S.Amount>
          </S.AmountDiv>
          <S.ButtonsDiv>
            <S.Button
              confirmar={false}
              type="button"
              onClick={() => navigate('/')}
            >
              Voltar
            </S.Button>
            <S.Button confirmar={true} onClick={() => confirmaPedido()}>
              Confirmar pedido
            </S.Button>
          </S.ButtonsDiv>
        </S.Form>
      </S.CheckoutDiv>
      <AddressModal />
      <Loader isVisible={isLoadingAddress || isLoadingCreateNewOrder} />
    </>
  )
}

export default Checkout
