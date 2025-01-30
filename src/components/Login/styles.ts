import styled from 'styled-components'
import { colors } from '../../styles'
import { Link } from 'react-router-dom'

export const LoginSignupContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: ${colors.black};
  overflow-x: hidden;
`
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: 8px;
  padding: 24px;
  row-gap: 24px;
  min-width: 30vw;
  margin: 20px 0;

  h1 {
    text-align: center;
    font-size: 3em;
  }

  h2 {
    text-align: center;
    font-size: 2em;
  }
`
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  label {
    text-align: center;
    font-size: 1.5em;
    width: 100%;
  }

  select {
    outline: none;
    border: 2px solid transparent;
    padding: 8px;
    border-radius: 8px;
    font-size: 1.4em;

    &:hover {
      border: 2px solid ${colors.gray};
      box-shadow: 0 0 10px ${colors.gray};
    }
  }

  input {
    outline: none;
    border: 2px solid transparent;
    padding: 8px;
    border-radius: 8px;
    font-size: 1.4em;

    &:focus {
      border: 2px solid ${colors.gray};
      box-shadow: 0 0 10px ${colors.gray};
    }

    &:hover {
      border: 2px solid ${colors.gray};
      box-shadow: 0 0 10px ${colors.gray};
    }

    &:disabled {
      background-color: ${colors.black};
      color: ${colors.white};
      text-align: center;

      &:hover {
        border: 2px solid transparent;
        box-shadow: none;
      }
    }
  }

  small {
    text-align: center;
    font-size: 1.1em;
    color: red;
  }
`
export const Button = styled.button`
  border-radius: 8px;
  padding: 4px;
  font-size: 2em;
  cursor: pointer;
  border: 2px solid ${colors.black};
  transition: all ease-in-out 200ms;

  &:hover {
    border: 2px solid ${colors.black};
    box-shadow: 0 0 10px ${colors.black};
    background-color: ${colors.black};
    color: ${colors.white};
    transition: all ease-in-out 200ms;
  }
`
export const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
export const LinkA = styled(Link)`
  font-size: 1.2em;
  &:hover {
    color: #597ad0;
  }
`
