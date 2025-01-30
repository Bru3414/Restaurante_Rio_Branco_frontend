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
  border: 1px solid ${colors.gray};

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
  }

  h4 {
    font-size: 1.6em;
    text-transform: uppercase;
    text-align: center;
    margin: 4px 0;
    font-weight: 300;
  }

  p {
    text-transform: capitalize;
    text-align: center;
    font-size: 1.2;
  }

  span {
    margin-top: 4px;
    font-weight: bold;
    font-size: 18px;
  }

  &:hover {
    box-shadow: 0 0 10px ${colors.gray};
    transition: all ease-in-out 300ms;
  }
`
