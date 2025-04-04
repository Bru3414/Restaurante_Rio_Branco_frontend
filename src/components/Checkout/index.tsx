import { useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import * as Yup from 'yup'
import * as S from './styles'
import ProductsCart from '../ProductsCart'
import { useFormik } from 'formik'
import { parseToBrl } from '../../utils'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const { cart: cartStore, isOpen } = useSelector(
    (state: RootReducer) => state.cart
  )
  const navigate = useNavigate()

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
      console.log('')
    }
  })

  const getErrorMessageEntrega = (fieldName: string, message?: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors

    if (isInvalid && isTouched) {
      return message
    }
    return ''
  }

  const getTotalValor = (): string => {
    let valor = 0
    cartStore.products.forEach((item) => {
      valor += item.price
    })
    return parseToBrl(valor)
  }

  return (
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
            <option value="ENTREGA">Retirada no local</option>
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
                Rua Afonso Jose, nº 4235 - Setor 1A - Jaru/RO (Entrada do morro
                da cidade alta)
              </p>
              <button type="button">Trocar endereço</button>
            </>
          ) : (
            <p>Endereço: Restaurante</p>
          )}
        </S.AddressDiv>
        <S.TypeDeliveryPaymentDiv>
          <h2>Forma de pagamento</h2>
          <select
            name="payment"
            id="payment"
            value={form.values.payment}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          >
            <option value="">--- Selecione a forma de pagamento ---</option>
            <option value="DINHEIRO">Dinheiro</option>
            <option value="CARTAO">Cartão</option>
            <option value="PIX">PIX</option>
          </select>
          <S.Error>
            {getErrorMessageEntrega('payment', form.errors.payment)}
          </S.Error>
        </S.TypeDeliveryPaymentDiv>
        {form.values.payment == 'DINHEIRO' && (
          <S.Troco>
            <h3>Precisa de troco?</h3>
            <input
              name="troco"
              value={form.values.troco}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              type="text"
              placeholder="Exemplo: Troco para R$ 50,00"
            />
            <S.Error>
              {getErrorMessageEntrega('troco', form.errors.troco)}
            </S.Error>
          </S.Troco>
        )}
        <S.AmountDiv>
          <S.Amount>
            <span className="dotted-text">Subtotal:</span>
            <span>{getTotalValor()}</span>
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
            <span>{getTotalValor()}</span>
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
          <S.Button confirmar={true} type="submit">
            Confirmar pedido
          </S.Button>
        </S.ButtonsDiv>
      </S.Form>
    </S.CheckoutDiv>
  )
}

export default Checkout
