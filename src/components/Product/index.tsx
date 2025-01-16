import { parseToBrl } from '../../utils'
import * as S from './styles'

type Props = {
  img: string
  title: string
  description: string
  price: number
}

const Product = ({ img, title, description, price }: Props) => {
  return (
    <S.Card>
      <img src={img} alt="Marmita ilustrativa" />
      <h4>{title}</h4>
      <p>{description}</p>
      <span>{parseToBrl(price)}</span>
    </S.Card>
  )
}

export default Product
