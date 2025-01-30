import { parseToBrl } from '../../utils'
import * as S from './styles'

type Props = {
  img: ImageProductDB
  title: string
  description: string
  price: number
}

const Product = ({ img, title, description, price }: Props) => {
  return (
    <S.Card>
      <div>
        <img src={img.url} alt={img.name} />
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <span>{parseToBrl(price)}</span>
    </S.Card>
  )
}

export default Product
