import * as S from './styles'

const Footer = () => {
  return (
    <S.DivContainer>
      <S.DivFooter className="container">
        <div>
          <h3>ÀREA DE ENTREGA</h3>
          <span>Jaru/RO</span>
          <S.ButtonDiv>
            <button>VER BAIRROS DISPONÍVEIS</button>
          </S.ButtonDiv>
        </div>
        <div>
          <h3>NOS ACOMPANHE NAS REDES SOCIAIS</h3>
          <span>Facebook</span>
          <span>Instagram</span>
        </div>
        <div>
          <h3>HORÁRIO DE ATENDIMENTO</h3>
          <span>
            Atendimento de <b>segunda</b> à <b>domingo</b>, das <b>11:00h</b> às{' '}
            <b>14:30</b>
          </span>
          <span>Contato: (69) 9 9254-1979</span>
        </div>
        <div>
          <h3>ENDEREÇO</h3>
          <span>Avenida Dom Pedro 1, 3028 - Setor 05, Jaru/RO</span>
        </div>
      </S.DivFooter>
    </S.DivContainer>
  )
}

export default Footer
