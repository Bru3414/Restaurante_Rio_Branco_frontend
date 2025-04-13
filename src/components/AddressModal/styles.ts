import styled from 'styled-components'
import { colors } from '../../styles'
import { InputContainer } from '../Login/styles'

type Props = {
  typeButton: 'CONFIRM' | 'CANCEL' | 'ADD'
}

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.3em;
`

export const Item = styled.li`
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  padding: 8px;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid black;
  border-radius: 8px;
  background-color: ${colors.gray};

  div {
    display: flex;
    align-items: center;

    span {
      align-items: center;
      justify-content: center;
    }
  }

  label {
    cursor: pointer;
  }

  input {
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    display: flex;
    height: 30px;
    width: 30px;
    background-color: #eee;
    border-radius: 50%;
    border: 1px solid #000;
  }

  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  input:checked ~ .checkmark {
    background-color: #2196f3;
  }

  .checkmark:after {
    content: '';
    display: none;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark:after {
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
