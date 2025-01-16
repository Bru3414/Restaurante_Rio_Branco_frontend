import styled from 'styled-components'
import { colors } from '../../styles'

export const DivContainer = styled.footer`
  background-color: ${colors.white};
  padding: 24px;
  margin-top: 80px;
`

export const DivFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;

  div {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;

    h3 {
      color: ${colors.black};
      font-size: 20px;
    }

    span {
      color: ${colors.black};
      font-size: 18px;
      text-transform: capitalize;
    }
  }
`
export const ButtonDiv = styled.div`
  width: 60%;

  button {
    background-color: ${colors.gray};
    outline: none;
    border: none;
    padding: 8px;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
  }
`
