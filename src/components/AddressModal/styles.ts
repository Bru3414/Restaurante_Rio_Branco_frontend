import styled from 'styled-components'
import { colors } from '../../styles'
import { InputContainer } from '../Login/styles'

type Props = {
  typeButton: 'CONFIRM' | 'CANCEL' | 'ADD'
}

export const Item = styled.li`
  display: block;
  text-transform: capitalize;
  position: relative;
  padding-right: 35px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    right: 0;
    height: 30px;
    width: 30px;
    background-color: #eee;
    border-radius: 50%;
  }

  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  input:checked ~ .checkmark {
    background-color: #2196f3;
  }

  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark:after {
    top: 10px;
    left: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
  }
`
export const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5em;

  div {
    display: flex;
    column-gap: 8px;
  }
`
export const Button = styled.button<Props>`
  padding: 8px;
  font-size: 1.1em;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => {
    switch (props.typeButton) {
      case 'CONFIRM':
        return colors.green
      case 'CANCEL':
        return colors.red
      case 'ADD':
        return colors.blue
    }
  }};
`
export const Form = styled.form`
  display: block;
`
export const InputContainerAddress = styled(InputContainer)``

export const NumBairroDiv = styled.div`
  display: flex;
  justify-content: space-around;
`
