import styled from 'styled-components'

export const InputEndContainer = styled.div`
  display: flex;
  column-gap: 30px;
`

export const CompleTelContainer = styled.div`
  display: flex;
  column-gap: 30px;

  :nth-child(1) {
    width: 70%;

    label {
      width: 100%;
    }

    input {
      width: 100%;
    }
  }

  :nth-child(2) {
    width: 30%;

    label {
      width: 100%;
    }

    input {
      width: 100%;
    }
  }
`
