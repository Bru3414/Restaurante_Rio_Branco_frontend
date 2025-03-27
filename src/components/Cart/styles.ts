import styled from 'styled-components'
import { colors } from '../../styles'
import { Modal } from '../ModalContainer/styles'
import { Link } from 'react-router-dom'

export const ModalContainerCart = styled(Modal)`
  justify-content: flex-end;

  @keyframes cart {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .box {
    opacity: 0;
    animation: cart 0.3s ease-out forwards;
  }
`

export const CartDiv = styled.div`
  background-color: ${colors.white};
  min-width: 25vw;
  max-width: 32vw;
  height: 100vh;
  padding: 32px 16px 0 16px;
  z-index: 1;
  overflow: auto;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const CardDivGap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`

export const FinalizarDiv = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`

export const ValorTotal = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 4px solid ${colors.black};
  border-top-style: dotted;
  padding: 16px 0;

  span {
    font-size: 1.5em;
  }
`
export const ButtonCheckout = styled(Link)`
  border-radius: 8px;
  padding: 4px;
  font-size: 2em;
  cursor: pointer;
  border: 2px solid ${colors.black};
  transition: all ease-in-out 200ms;
  background-color: #fff;
  text-decoration: none;
  text-align: center;
  color: ${colors.black};

  &:hover {
    border: 2px solid ${colors.black};
    box-shadow: 0 0 10px ${colors.black};
    background-color: ${colors.black};
    color: ${colors.white};
    transition: all ease-in-out 200ms;
  }
`
