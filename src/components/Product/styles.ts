import styled from 'styled-components'
import { colors } from '../../styles'

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  justify-content: space-between;
  transition: all ease-in-out 300ms;

  p {
    text-transform: capitalize;
    text-align: center;
  }

  span {
    margin-top: 4px;
    font-weight: bold;
    font-size: 18px;
  }

  &:hover {
    background-color: ${colors.gray};
    transition: all ease-in-out 300ms;
  }
`
