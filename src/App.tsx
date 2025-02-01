import { Provider, useDispatch } from 'react-redux'
import Footer from './components/Footer'
import Header from './components/Header'
import Menu from './components/Menu'
import GlobalCSS from './styles'
import { store } from './store'
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter } from 'react-router-dom'
import Rotas from './routes'
import { useEffect } from 'react'
import { atualizaTokenStore } from './store/reducers/user'

function App() {
  return (
    <Provider store={store}>
      <GlobalCSS />
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </Provider>
  )
}

export default App
