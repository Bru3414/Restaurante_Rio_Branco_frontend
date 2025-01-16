import styled from 'styled-components'
import { colors } from '../../styles'

export const Title = styled.h2`
  color: ${colors.white};
  font-size: 30px;
`
export const DivTabs = styled.div`
  display: flex;
  column-gap: 4px;

  div {
    color: ${colors.black};
    padding: 4px;
    background-color: ${colors.gray};
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    border-bottom: 1px solid ${colors.black};
    cursor: pointer;
  }

  .active {
    background-color: ${colors.white};
    border: transparent;
    cursor: default;
  }
`
export const DivContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: center;
  padding: 16px;
  gap: 36px;
  background-color: ${colors.white};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
`
