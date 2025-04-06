import styled from 'styled-components'
import { colors } from '../../styles'

type Props = {
  backColor: boolean
}

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

  @keyframes fadeIn {
    from {
      opacity: 0.2;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .box {
    opacity: 0;
    animation: fadeIn 0.5s ease-in-out forwards;
  }

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
export const ModalContent = styled.div<Props>`
  max-width: 40vw;
  min-width: 30vw;
  position: relative;
  z-index: 1;
  background-color: ${(props) =>
    props.backColor ? colors.white : 'transparent'};
  border-radius: 8px;
  padding: 24px;
`
