import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Cart from './components/Cart'

const Rotas = () => {
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
