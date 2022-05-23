import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  ContainerHeader,
  ContainerSearch,
  ContainerTable,
  Schema,
  SearchField
} from '../component'
import { wait } from '../utils'

const columns = [
  {
    name: 'name',
    title: 'Название'
  },
  {
    name: 'argsSettings',
    title: 'Схемы аргументов',
    convert: (argsSettings) =>
      argsSettings.map((argSettings, index) => (
        <Schema
          key={index}
          schema={argSettings.schema}
        />
      ))
  },
  {
    name: 'resultSettings',
    title: 'Схема результата',
    convert: (resultSettings) =>
      <Schema schema={resultSettings.schema} />
  }
]

const getFunction = (namespaceName, name) =>
  FunctionAPI.getFunction(namespaceName, name)

const getFunctions = (namespaceName, names) =>
  wait(names.map((name) => getFunction(namespaceName, name)))

const searchFunction = async (namespaceName, name) => {
  try {
    const names = await FunctionAPI.searchFunction(namespaceName, name)

    return getFunctions(namespaceName, names)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список функций'
    })
  }

  return []
}

export default function Functions ({ namespaceName }) {
  const [name, setName] = useState('')
  const [functions, setFunctions] = useState([])

  const refresh = useCallback(async () => {
    const functions = await searchFunction(namespaceName, name)

    setFunctions(functions)
  })

  useEffect(() => { refresh() }, [name])

  return (
    <Container>
      <ContainerHeader title={'Функции'} />

      <ContainerSearch>
        <SearchField
          label={'Название'}
          placeholder={'Введите название...'}
          value={name}
          onChangeValue={setName}
        />
      </ContainerSearch>

      <ContainerTable
        columns={columns}
        rows={
          functions.map((attribute) => {
            return {
              key: attribute.name,
              name: attribute.name,
              argsSettings: attribute.argsSettings,
              resultSettings: attribute.resultSettings
            }
          })
        }
      />
    </Container>
  )
}

Functions.propTypes = {
  namespaceName: PropTypes.string
}
