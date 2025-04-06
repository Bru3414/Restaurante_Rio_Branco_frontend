import { useEffect, useState } from 'react'
import {
  useCreateNewAddressApiMutation,
  useFindAddressApiQuery,
  useSetAddressSelectedApiMutation
} from '../../services/api'
import ModalContainer from '../ModalContainer'
import * as S from './styles'
import Loader from '../Loader'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import { handleIsOpen } from '../../store/reducers/addressModal'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Bairro, City } from '../../utils'
import InputMask from 'react-input-mask'
import { InputContainer } from '../Login/styles'

const AddressModal = () => {
  const {
    data: address,
    isLoading: isLoadingAddress,
    isSuccess: isSuccessAddress,
    refetch: refetchFindAddress
  } = useFindAddressApiQuery()
  const [
    setAddressSelectedApi,
    {
      isSuccess: isSuccessSetAddressSelected,
      isLoading: isLoadingAddressSelected
    }
  ] = useSetAddressSelectedApiMutation()
  const [
    createNewAddressApi,
    {
      isLoading: isLoadingCreateNewAddress,
      isSuccess: isSuccessCreateNewAddress
    }
  ] = useCreateNewAddressApiMutation()
  const { isOpen } = useSelector((state: RootReducer) => state.addressModal)
  const [selected, setSelected] = useState<number>(0)
  const [isAddAddress, setIsAddAddress] = useState<boolean>(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isSuccessAddress) {
      const addressSelected = address.find((item) => item.isSelected === true)
      if (addressSelected) {
        setSelected(addressSelected.id)
      }
    }
  }, [isSuccessAddress])

  useEffect(() => {
    if (isSuccessSetAddressSelected) {
      dispatch(handleIsOpen(false))
    }
  }, [isSuccessSetAddressSelected])

  useEffect(() => {
    if (isSuccessCreateNewAddress) {
      setIsAddAddress(false)
      form.resetForm()
      refetchFindAddress()
    }
  }, [isSuccessCreateNewAddress])

  const form = useFormik({
    initialValues: {
      address: '',
      number: '',
      bairro: '',
      complement: '',
      city: City.JARU_RO
    },
    validationSchema: Yup.object({
      address: Yup.string()
        .required('Preencha este campo')
        .min(5, 'Endereço inválido')
        .max(50, 'Endereço muito grande'),
      number: Yup.string()
        .required('Preencha este campo')
        .min(1, 'Número inválido')
        .max(6, 'Número muito grande'),
      bairro: Yup.string().required('Escolha um bairro'),
      city: Yup.string().required('Preencha este campo')
    }),
    onSubmit: (values) => {
      createNewAddressApi({
        address: values.address,
        number: values.number,
        bairro: values.bairro,
        complement: values.complement
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
      <InputContainer>
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
      </InputContainer>
    )
  }

  const renderizaAddAddress = (): JSX.Element => {
    return (
      <S.Form onSubmit={form.handleSubmit}>
        <S.InputContainerAddress>
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
        </S.InputContainerAddress>
        <S.NumBairroDiv>
          <S.InputContainerAddress>
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
          </S.InputContainerAddress>
          {renderizaSelectBairro()}
        </S.NumBairroDiv>
        <S.InputContainerAddress>
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
        </S.InputContainerAddress>
        <S.ButtonsDiv>
          <S.Button
            type="button"
            typeButton="CANCEL"
            onClick={() => {
              setIsAddAddress(false)
              form.resetForm()
            }}
          >
            Cancelar
          </S.Button>
          <S.Button type="submit" typeButton="CONFIRM">
            Adicionar
          </S.Button>
        </S.ButtonsDiv>
      </S.Form>
    )
  }

  const renderizaSelectAddress = (): JSX.Element => {
    return (
      <div>
        <ul>
          {address &&
            address.map((item) => (
              <S.Item key={item.id}>
                <label htmlFor={item.id.toString()}>
                  {item.address}, nº {item.number} -{' '}
                  {item.bairro.replaceAll('_', ' ')} -{' '}
                  {item.city.replace('_', '/')}
                  {item.complement && ` (${item.complement})`}
                </label>
                <input
                  id={item.id.toString()}
                  type="radio"
                  checked={selected === item.id}
                  onClick={() => setSelected(item.id)}
                />
                <span
                  className="checkmark"
                  onClick={() => setSelected(item.id)}
                ></span>
              </S.Item>
            ))}
          <S.ButtonsDiv>
            <div>
              <S.Button
                typeButton="CANCEL"
                onClick={() => dispatch(handleIsOpen(false))}
              >
                Cancelar
              </S.Button>
              <S.Button typeButton="ADD" onClick={() => setIsAddAddress(true)}>
                Adicionar novo endereço
              </S.Button>
            </div>
            <S.Button
              typeButton="CONFIRM"
              onClick={() => setAddressSelectedApi(selected)}
            >
              Confirmar
            </S.Button>
          </S.ButtonsDiv>
        </ul>
      </div>
    )
  }

  return (
    <>
      <ModalContainer isVisible={isOpen}>
        {isAddAddress ? renderizaAddAddress() : renderizaSelectAddress()}
      </ModalContainer>
      <Loader isVisible={isLoadingAddress || isLoadingAddressSelected} />
    </>
  )
}

export default AddressModal
