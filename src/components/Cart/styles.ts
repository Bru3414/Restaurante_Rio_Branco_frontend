import styled from 'styled-components'
import { colors } from '../../styles'
import { Modal } from '../ModalContainer/styles'

export const ModalContainerCart = styled(Modal)`
  justify-content: flex-end;
`

export const CartDiv = styled.div`
  background-color: ${colors.white};
  min-width: 25vw;
  height: 100vh;
  padding: 32px 16px 0 16px;
  z-index: 1;
  overflow: auto;
  padding-bottom: 16px;
`
export const CardProduto = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  column-gap: 24px;
  border-bottom: 3px solid ${colors.black};
  border-bottom-style: dotted;
  padding: 8px;
  align-items: center;

  img {
    width: 6.5em;
    height: 6.5em;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid ${colors.black};
  }
`
export const QtdProdutos = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  border: 1px solid ${colors.black};
  border-radius: 25px;
  background-color: #fff;
  width: 81px;
  height: 30px;
  border-radius: 25px;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    width: 2em;

    &:disabled {
      text-align: center;
      border: none;
      background-color: #fff;
    }
  }

  span {
    width: 24px;
    line-height: 24px;
    display: block;
    text-align: center;
    font-size: 29px;
    color: #ff0d0d;
    cursor: pointer;
    height: 30px;
  }

  span {
    &:first-child {
      margin-bottom: 4px;
    }

    &:last-child {
      color: #00b400;
      margin-top: 4px;
    }
  }
`
export const Price = styled.span`
  font-size: 1.1em;
  margin: 8px 4px 0 0;
  font-weight: bold;
`
