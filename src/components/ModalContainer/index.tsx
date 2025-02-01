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
