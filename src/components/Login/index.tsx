import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'

import { useLoginMutation } from '../../services/api'
import * as S from './styles'
import { useEffect } from 'react'

const Login = () => {
  const [loginApi, { data, isSuccess, isLoading }] = useLoginMutation()

  useEffect(() => {
    if (data) {
      localStorage.setItem('TOKEN_APLICACAO', data.token)
    }
  }, [isSuccess])

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
          <S.LinkA to={'/'}>Esqueci minha senha</S.LinkA>
        </S.LinksContainer>
      </S.FormContainer>
    </S.LoginSignupContainer>
  )
}

export default Login
