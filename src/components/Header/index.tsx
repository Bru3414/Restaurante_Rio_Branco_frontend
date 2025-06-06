import * as S from './styles'
import imgHeader from '../../assets/images/img_header.png'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTokenStore } from '../../store/reducers/user'
import { RootReducer } from '../../store'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { token } = useSelector((state: RootReducer) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <>
      <S.DivTitle>
        <S.TitleHeader className="container">
          Restaurante e Bistrô Rio Branco
        </S.TitleHeader>
        <S.DivOptions>
          {token ? (
            <S.ButtonSair
              type="submit"
              onClick={() => {
                dispatch(deleteTokenStore())
                navigate('/')
                window.location.reload()
              }}
            >
              Sair
            </S.ButtonSair>
          ) : (
            <S.LoginSignup to={'/signin'}>Entre/Cadastre-se</S.LoginSignup>
          )}
        </S.DivOptions>
      </S.DivTitle>
      <S.imgHeader src={imgHeader} />
    </>
  )
}

export default Header
