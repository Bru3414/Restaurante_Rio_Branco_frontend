import styled from 'styled-components'

import { colors } from '../../styles'
import { Link } from 'react-router-dom'

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
export const DivOptions = styled.div`
  position: absolute;
  top: 1.7em;
  right: 16px;
`

export const ButtonSair = styled.button`
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

export const LoginSignup = styled(Link)`
  font-size: 1.6em;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: ${colors.black};
  border-bottom: 2px solid ${colors.black};
  margin: 16px;
  text-decoration: none;

  &:hover {
    color: #597ad0;
    border-color: #597ad0;
  }
`
