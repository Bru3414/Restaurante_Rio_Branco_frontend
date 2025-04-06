import { useEffect } from 'react'
import * as S from './styles'

type Props = {
  children: JSX.Element
  isVisible: boolean
  backColor?: boolean
  onClick?: VoidFunction
}

const ModalContainer = ({
  children,
  isVisible,
  onClick,
  backColor = true
}: Props) => {
  useEffect(() => {
    if (isVisible) {
      // Bloqueia a rolagem ao montar o componente
      document.body.style.overflow = 'hidden'
    } else {
      // Restaura a rolagem ao desmontar o componente
      document.body.style.overflow = 'auto'
    }
  }, [isVisible])

  return (
    <S.Modal className={isVisible ? 'visible' : ''}>
      <S.ModalContent backColor={backColor} className={isVisible ? 'box' : ''}>
        {children}
      </S.ModalContent>
      <div className="overlay" onClick={onClick} />
    </S.Modal>
  )
}

export default ModalContainer
