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
    name: 'path',
    title: 'Путь',
    convert: (path) =>
      path
        .map((key) => key.replace(/["]/g, '\\$&'))
        .map((key) => `"${key}"`)
        .join('.')
  },
  {
    name: 'schema',
    title: 'Схема',
    convert: (schema) =>
      <Schema schema={schema} />
  },
  {
    name: 'computer',
    title: 'Поддержка вычисления',
    convert: (computer) =>
      computer ? 'Да' : 'Нет'
  }
]

const getAttribute = (namespaceName, name) =>
  AttributeAPI.getAttribute(namespaceName, name)

const getAttributes = (namespaceName, names) =>
  wait(names.map((name) => getAttribute(namespaceName, name)))

const searchAttribute = async (namespaceName, name) => {
  try {
    const names = await AttributeAPI.searchAttribute(namespaceName, name)

    return getAttributes(namespaceName, names)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список атрибутов'
    })
  }

  return []
}

export default function Attributes ({ namespaceName }) {
  const [name, setName] = useState('')
  const [attributes, setAttributes] = useState([])

  const refresh = useCallback(async () => {
    const attributes = await searchAttribute(namespaceName, name)

    setAttributes(attributes)
  })

  useEffect(() => { refresh() }, [name])

  return (
    <Container>
      <ContainerHeader title={'Атрибуты'} />

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
          attributes.map((attribute) => {
            return {
              key: attribute.name,
              name: attribute.name,
              path: attribute.path,
              schema: attribute.schema,
              computer: attribute.computer
            }
          })
        }
      />
    </Container>
  )
}

Attributes.propTypes = {
  namespaceName: PropTypes.string
}
