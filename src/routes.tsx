import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Cart from './components/Cart'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { atualizaTokenStore } from './store/reducers/user'
import { RootReducer } from './store'
import { clearError } from './store/reducers/error'

const Rotas = () => {
  const { error } = useSelector((state: RootReducer) => state.error)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('TOKEN_APLICACAO')

    if (token) {
      dispatch(atualizaTokenStore(token))
    }
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Home />
            <Cart />
          </>
        }
      />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default Rotas
