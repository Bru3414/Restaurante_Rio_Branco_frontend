import { PuffLoader } from 'react-spinners'
import { Modal } from '../ModalContainer/styles'
import ModalContainer from '../ModalContainer'

type Props = {
  isVisible: boolean
}

const Loader = ({ isVisible }: Props) => {
  return (
    <ModalContainer backColor={false} isVisible={isVisible}>
      <PuffLoader color="#fff" size={120} />
    </ModalContainer>
  )
}

export default Loader
