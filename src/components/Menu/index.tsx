import * as S from './styles'
import Product from '../Product'
import imgProduto from '../../assets/images/img_marmita.png'
import { useEffect, useState } from 'react'
import { useBuscaProdutosApiQuery } from '../../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { atualizaProdutosStore } from '../../store/reducers/productMenu'
import { Category } from '../../utils'
import { RootReducer } from '../../store'

const Menu = () => {
  const {
    data: produtosApi,
    isLoading: isLoadingBuscaProdutos,
    isSuccess: isSuccessBuscaProdutos
  } = useBuscaProdutosApiQuery()
  const { items } = useSelector((state: RootReducer) => state.productMenu)
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState<Category>(
    Object.values(Category)[0]
  )

  useEffect(() => {
    if (produtosApi) {
      dispatch(atualizaProdutosStore(produtosApi))
    }
  }, [isSuccessBuscaProdutos])

  const renderizaProdutos = (): JSX.Element => {
    const produtos = items.filter((item) => item.category === activeTab)

    if (produtos.length <= 0) {
      return (
        <S.DivContent>
          <p>Desculpe, estamos sem produtos no momento</p>
        </S.DivContent>
      )
    }

    return (
      <S.DivContent>
        {produtos
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <Product
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              category={item.category}
              id={item.id}
            />
          ))}
      </S.DivContent>
    )
  }

  const renderizaTabs = (): JSX.Element => {
    const valuesCategory = Object.values(Category)

    return (
      <S.DivTabs>
        {valuesCategory.map((category) => (
          <div
            key={category}
            className={activeTab === category ? 'active' : ''}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </div>
        ))}
      </S.DivTabs>
    )
  }

  return (
    <div className="container">
      <S.Title>Nosso Cardápio</S.Title>
      {renderizaTabs()}
      {renderizaProdutos()}
    </div>
  )
}

export default Menu
