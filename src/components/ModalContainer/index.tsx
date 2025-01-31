import * as S from './styles'

type Props = {
  children: JSX.Element
  isVisible: boolean
  onClick: VoidFunction
}

const ModalContainer = ({ children, isVisible, onClick }: Props) => {
  return (
    <S.Modal className={isVisible ? 'visible' : ''}>
      <S.ModalContent>{children}</S.ModalContent>
      <div className="overlay" onClick={onClick} />
    </S.Modal>
  )
}

export default ModalContainer
