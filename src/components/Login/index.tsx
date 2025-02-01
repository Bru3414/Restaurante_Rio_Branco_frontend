import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'

import { useLoginMutation } from '../../services/api'
import * as S from './styles'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { atualizaTokenStore } from '../../store/reducers/user'
import { Navigate } from 'react-router-dom'
import { clearError } from '../../store/reducers/error'

const Login = () => {
  const dispatch = useDispatch()
  const [loginApi, { data, isSuccess, isLoading, isError }] = useLoginMutation()

  useEffect(() => {
    dispatch(clearError())
  }, [])

  useEffect(() => {
    if (data) {
      dispatch(atualizaTokenStore(data.token))
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      alert('erro')
    }
  }, [isError])

  const form = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Preencha este campo')
        .email('Email inválido'),
      password: Yup.string().required('Preencha este campo')
    }),
    onSubmit: (values) => {
      loginApi({
        username: values.email,
        password: values.password
      })
    }
  })

  const getErrorMessageEntrega = (fieldName: string, message?: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors

    if (isInvalid && isTouched) {
      return message
    }
    return ''
  }

  if (isSuccess && data) {
    return <Navigate to={'/'} />
  }

  return (
    <S.LoginSignupContainer>
      <S.FormContainer onSubmit={form.handleSubmit}>
        <h1>Entrar</h1>
        <S.InputContainer>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            type="email"
          />
          <small>{getErrorMessageEntrega('email', form.errors.email)}</small>
        </S.InputContainer>
        <S.InputContainer>
          <label htmlFor="password">Senha</label>
          <input
            name="password"
            id="password"
            value={form.values.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            type="password"
          />
          <small>
            {getErrorMessageEntrega('password', form.errors.password)}
          </small>
        </S.InputContainer>
        <S.Button type="submit">Entrar</S.Button>
        <S.LinksContainer>
          <S.LinkA to={'/signup'}>Não tem uma conta? Crie aqui!</S.LinkA>
          <S.LinkA to={'/'}>Volta para o cardápio</S.LinkA>
        </S.LinksContainer>
      </S.FormContainer>
    </S.LoginSignupContainer>
  )
}

export default Login
