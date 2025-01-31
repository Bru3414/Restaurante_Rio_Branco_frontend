import styled from 'styled-components'
import { colors } from '../../styles'

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  align-items: center;
  justify-content: center;
  display: none;

  &.visible {
    display: flex;
  }

  .overlay {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.73);
  }
`
export const ModalContent = styled.div`
  max-width: 960px;
  position: relative;
  z-index: 1;
  background-color: ${colors.white};
  border-radius: 8px;
  padding: 24px;
`
