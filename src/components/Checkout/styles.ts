import styled from 'styled-components'
import { colors } from '../../styles'

type PropsButton = {
  confirmar: boolean
}

export const CheckoutDiv = styled.div`
  background-color: ${colors.white};
  padding: 24px;
  border-radius: 8px;
  margin-top: 40px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
`

export const AmountDiv = styled.div`
  border-bottom: 3px solid black;
  border-top: 3px solid black;
  padding: 8px 0;
  margin-top: 8px;

  .dotted {
    display: flex;
    width: 100%;
    border-top: 3px dotted black;
    margin: 8px 0 4px;
  }
`

export const TypeDeliveryPaymentDiv = styled.div`
  select {
    padding: 16px;
    border: none;
    border-radius: 8px;
    font-size: 1.2em;
    cursor: pointer;
    outline: none;
  }
`
export const Error = styled.small`
  display: flex;
  color: red;
  font-size: 1em;
`

export const AddressDiv = styled.div`
  background-color: ${colors.gray};
  width: 70%;
  border-radius: 8px;
  padding: 16px;

  p {
    font-size: 1.4em;
    margin-bottom: 0.4em;
  }

  button {
    padding: 8px;
    border: none;
    font-size: 1.3em;
    cursor: pointer;
    background-color: ${colors.white};

    &:hover {
      background-color: ${colors.black};
      color: ${colors.white};
    }
  }
`

export const Amount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 1.3em;
  }
`
export const Troco = styled.div`
  input {
    width: 30%;
    padding: 16px;
    border: none;
    border-radius: 8px;
    font-size: 1.2em;
    outline: none;
  }
`
export const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
export const Button = styled.button<PropsButton>`
  padding: 16px;
  font-size: 1.8em;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.confirmar ? 'green' : colors.gray)};
`
