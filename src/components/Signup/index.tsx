import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'

import * as S from '../Login/styles'
import { CompleTelContainer, InputEndContainer } from './styles'
import { Bairro, City } from '../../utils'
import { useSignupMutation } from '../../services/api'
import { useEffect } from 'react'
import { atualizaTokenStore } from '../../store/reducers/user'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loader from '../Loader'

const Signup = () => {
  const [signupApi, { data, isSuccess, isLoading }] = useSignupMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(atualizaTokenStore(data.token))
      form.resetForm()
    }
  }, [isSuccess])

  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      address: '',
      number: '',
      bairro: '',
      telefone: '',
      complement: '',
      city: City.JARU_RO
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Preencha este campo')
        .min(3, 'Nome inválido')
        .max(50, 'Nome muito grande'),
      email: Yup.string()
        .required('Preencha este campo')
        .email('Email inválido'),
      password: Yup.string()
        .required('Preencha este campo')
        .min(5, 'Mínimo de 5 caracteres')
        .max(50, 'Máximo de 50 caracteres'),
      address: Yup.string()
        .required('Preencha este campo')
        .min(5, 'Endereço inválido')
        .max(50, 'Endereço muito grande'),
      number: Yup.string()
        .required('Preencha este campo')
        .min(1, 'Número inválido')
        .max(6, 'Número muito grande'),
      bairro: Yup.string().required('Escolha um bairro'),
      telefone: Yup.string()
        .required('Preencha este campo')
        .min(15, 'Número inválido')
        .max(15, 'Número muito grande'),
      city: Yup.string().required('Preencha este campo')
    }),
    onSubmit: (values) => {
      signupApi({
        user: {
          name: values.name,
          email: values.email,
          password: values.password
        },
        address: {
          address: values.address,
          bairro: values.bairro,
          city: values.city,
          complement: values.complement,
          number: values.number
        },
        phone: values.telefone.replace(/\D/g, '')
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

  const renderizaSelectBairro = (): JSX.Element => {
    const values = Object.values(Bairro)

    return (
      <S.InputContainer>
        <label htmlFor="bairro">Bairro</label>
        <select
          name="bairro"
          id="bairro"
          value={form.values.bairro}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        >
          <option value="">Selecione um bairro</option>
          {values.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <small>{getErrorMessageEntrega('bairro', form.errors.bairro)}</small>
      </S.InputContainer>
    )
  }

  if (isSuccess && data) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <S.LoginSignupContainer>
        <S.FormContainer onSubmit={form.handleSubmit}>
          <h1>Cadastro</h1>
          <S.InputContainer>
            <label htmlFor="name">Nome</label>
            <input
              name="name"
              id="name"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              type="text"
            />
            <small>{getErrorMessageEntrega('name', form.errors.name)}</small>
          </S.InputContainer>
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
          <h2>Endereço</h2>
          <S.InputContainer>
            <label htmlFor="address">Endereço</label>
            <input
              name="address"
              id="address"
              value={form.values.address}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              type="text"
            />
            <small>
              {getErrorMessageEntrega('address', form.errors.address)}
            </small>
          </S.InputContainer>
          <InputEndContainer>
            <S.InputContainer>
              <label htmlFor="number">Número</label>
              <InputMask
                maskChar=""
                mask="999999"
                name="number"
                id="number"
                value={form.values.number}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                type="text"
              />
              <small>
                {getErrorMessageEntrega('number', form.errors.number)}
              </small>
            </S.InputContainer>
            {renderizaSelectBairro()}
            <S.InputContainer>
              <label htmlFor="telefone">Telefone</label>
              <InputMask
                maskChar=""
                mask="(99) 99999-9999"
                name="telefone"
                id="telefone"
                value={form.values.telefone}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                type="text"
              />
              <small>
                {getErrorMessageEntrega('telefone', form.errors.telefone)}
              </small>
            </S.InputContainer>
          </InputEndContainer>
          <CompleTelContainer>
            <S.InputContainer>
              <label htmlFor="complement">Complemento</label>
              <input
                name="complement"
                id="complement"
                value={form.values.complement}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                type="text"
              />
              <small>
                {getErrorMessageEntrega('complement', form.errors.complement)}
              </small>
            </S.InputContainer>
            <S.InputContainer>
              <label htmlFor="city">Cidade</label>
              <input
                disabled={true}
                name="city"
                id="city"
                value={form.values.city}
                type="text"
              />
            </S.InputContainer>
          </CompleTelContainer>
          <S.Button type="submit">Cadastrar</S.Button>
          <S.LinksContainer>
            <S.LinkA to={'/signin'}>Já tem uma conta? Entre aqui!</S.LinkA>
          </S.LinksContainer>
        </S.FormContainer>
      </S.LoginSignupContainer>
      <Loader isVisible={isLoading} />
    </>
  )
}

export default Signup
