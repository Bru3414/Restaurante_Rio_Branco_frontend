import { ListFormat } from 'typescript'

export const parseToBrl = (amout = 0) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amout)
}

export enum Role {
  ROLE_CUSTOMER = 'ROLE_CUSTOMER',
  ROLE_MODERATOR = 'ROLE_MODERATOR',
  ROLE_ADMIN = 'ROLE_ADMIN'
}

export enum Category {
  MARMITA = 'MARMITA',
  BEBIDA = 'BEBIDA'
}

export enum City {
  JARU_RO = 'JARU_RO'
}

export enum Bairro {
  JARDIM_BELA_VISTA = 'JARDIM_BELA_VISTA',
  JARDIM_DOS_ESTADOS = 'JARDIM_DOS_ESTADOS',
  JARDIM_EUROPA = 'JARDIM_EUROPA',
  JARDIM_MORUMBI = 'JARDIM_MORUMBI',
  JARDIM_NOVO_ESTADO = 'JARDIM_NOVO_ESTADO',
  JARDIM_ORLANDINI = 'JARDIM_ORLANDINI',
  JARDIM_PRIMAVERA = 'JARDIM_PRIMAVERA',
  ORLEANS_RESIDENCIAL = 'ORLEANS_RESIDENCIAL',
  PARK_UNIVERSITARIO = 'PARK_UNIVERSITARIO',
  SAVANA_PARK = 'SAVANA_PARK',
  SETOR_1 = 'SETOR_1',
  SETOR_1A = 'SETOR_1A',
  SETOR_2 = 'SETOR_2',
  SETOR_3 = 'SETOR_3',
  SETOR_4 = 'SETOR_4',
  SETOR_5 = 'SETOR_5',
  SETOR_6 = 'SETOR_6',
  SETOR_7 = 'SETOR_7',
  SETOR_8 = 'SETOR_8',
  SETOR_INDUSTRIAL = 'SETOR_INDUSTRIAL'
}
