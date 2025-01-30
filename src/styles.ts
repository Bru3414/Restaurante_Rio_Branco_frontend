import styled, { createGlobalStyle } from 'styled-components'

export const colors = {
  black: '#222f3e',
  white: '#D9D9D9',
  gray: '#8395A7'
}

const GlobalCSS = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Oswald", serif;
  }

  .container {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
  }

  body {
    background-color: ${colors.black};
  }
`
export default GlobalCSS
