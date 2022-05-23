import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import {
  Container,
  ContainerHeader,
  ContainerSearch,
  ContainerTable,
  SearchField
} from '../component'
import Attributes from './Attributes'
import Functions from './Functions'
import { wait } from '../utils'

const columns = [
  {
    sx: {
      maxWidth: '20%'
    },
    name: 'name',
    title: 'Название'
  },
  {
    collapse: true,
    sx: {
      width: '70px'
    },
    name: 'attributes',
    title: 'Атрибуты',
    convert: ({ name }) =>
      <Attributes namespaceName={name} />
  },
  {
    collapse: true,
    sx: {
      width: '70px'
    },
    name: 'functions',
    title: 'Функции',
    convert: ({ name }) =>
      <Functions namespaceName={name} />
  }
]

const getNamespace = (name) =>
  NamespaceAPI.getNamespace(name)

const getNamespaces = (names) =>
  wait(names.map(getNamespace))

const searchNamespace = async (name) => {
  try {
    const names = await NamespaceAPI.searchNamespace(name)

    return getNamespaces(names)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список пространств имен'
    })
  }

  return []
}

export default function Namespaces () {
  const [name, setName] = useState('')
  const [namespaces, setNamespaces] = useState([])

  const refresh = useCallback(async () => {
    const namespaces = await searchNamespace(name)

    setNamespaces(namespaces)
  })

  useEffect(() => { refresh() }, [name])

  return (
    <Container>
      <ContainerHeader title={'Пространства имен'} />

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
          namespaces.map((namespace) => {
            const { name } = namespace

            return {
              key: name,
              name
            }
          })
        }
      />
    </Container>
  )
}
