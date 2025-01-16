import * as S from './styles'
import imgHeader from '../../assets/images/img_header.png'

const Header = () => {
  return (
    <>
      <S.DivTitle>
        <S.TitleHeader className="container">
          Restaurante e Bistrô Rio Branco
        </S.TitleHeader>
      </S.DivTitle>
      <S.imgHeader src={imgHeader} />
    </>
  )
}

export default Header
