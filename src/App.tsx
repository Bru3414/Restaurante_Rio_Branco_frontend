import { Provider } from 'react-redux'
import Footer from './components/Footer'
import Header from './components/Header'
import Menu from './components/Menu'
import GlobalCSS from './styles'
import { store } from './store'
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter } from 'react-router-dom'
import Rotas from './routes'

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
