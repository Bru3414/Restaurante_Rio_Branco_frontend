import * as S from './styles'
import Product from '../Product'
import imgProduto from '../../assets/images/img_marmita.png'
import { useState } from 'react'

const Menu = () => {
  const [activeTab, setActiveTab] = useState('tabMarmitas')

  const handleTabMarmitas = () => {
    setActiveTab('tabMarmitas')
  }

  const handleTabBebidas = () => {
    setActiveTab('tabBebidas')
  }

  return (
    <div className="container">
      <S.Title>Nosso Cardápio</S.Title>
      <S.DivTabs>
        <div
          className={activeTab === 'tabMarmitas' ? 'active' : ''}
          onClick={handleTabMarmitas}
        >
          Marmitas
        </div>
        <div
          className={activeTab === 'tabBebidas' ? 'active' : ''}
          onClick={handleTabBebidas}
        >
          Bebidas
        </div>
      </S.DivTabs>
      <S.DivContent>
        {activeTab === 'tabMarmitas' ? (
          <>
            <Product
              img={imgProduto}
              title="Marmita Padrão"
              description="Arroz, feijão, farofa, macarrão, 2 tipos de carne a escolha."
              price={20.0}
            />
            <Product
              img={imgProduto}
              title="Marmita C/maionese"
              description="Arroz, feijão, farofa, macarrão, maionese, 2 tipos de carne a escolha."
              price={23.0}
            />
            <Product
              img={imgProduto}
              title="Marmita Especial"
              description="Arroz, feijão, farofa, macarrão, maionese, 2 tipos de carne a escolha. +CARNE"
              price={26.0}
            />
            <Product
              img={imgProduto}
              title="Marmita Padrão"
              description="Arroz, feijão, farofa, macarrão, 2 tipos de carne a escolha."
              price={20.0}
            />
            <Product
              img={imgProduto}
              title="Marmita C/maionese"
              description="Arroz, feijão, farofa, macarrão, maionese, 2 tipos de carne a escolha."
              price={23.0}
            />
            <Product
              img={imgProduto}
              title="Marmita Especial"
              description="Arroz, feijão, farofa, macarrão, maionese, 2 tipos de carne a escolha. +CARNE"
              price={26.0}
            />
          </>
        ) : (
          <div>Teste</div>
        )}
      </S.DivContent>
    </div>
  )
}

export default Menu
