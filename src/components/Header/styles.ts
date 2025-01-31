import styled from 'styled-components'

import { colors } from '../../styles'

export const DivTitle = styled.div`
  background-color: ${colors.white};
  padding: 16px 0;
  position: relative;
`

export const TitleHeader = styled.h1`
  font-style: italic;
  font-size: 48px;
  font-weight: 400;
  color: ${colors.white};
  text-align: center;
  background-color: ${colors.black};
  border-radius: 16px;
`

export const imgHeader = styled.img`
  width: 100%;
`
export const ButtonSair = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 1.6em;
  cursor: pointer;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid ${colors.black};
  margin: 16px;

  &:hover {
    color: #597ad0;
    border-color: #597ad0;
  }
`
