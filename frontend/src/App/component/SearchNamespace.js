import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import TextField from './TextField'
import { Autocomplete } from '@mui/material'
import { wait } from '../utils'

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

export default function SearchNamespace ({
  value,
  onChange,
  ...props
}) {
  const [name, setName] = useState('')
  const [namespaces, setNamespaces] = useState([])

  const refresh = useCallback(async () => {
    const namespaces = await searchNamespace(name)

    setNamespaces(namespaces)
  })

  useEffect(() => { refresh() }, [name])

  return (
    <Autocomplete
      id={'SearchNamespace'}
      getOptionLabel={(namespace) => namespace.name}
      value={value}
      onChange={(_, value) => {
        onChange(value)
      }}
      inputValue={name}
      onInputChange={(_, name) => setName(name)}
      options={namespaces}
      renderInput={(params) => (
        <TextField
          {...props}
          {...params}
          label={'Пространство имен'}
          placeholder={'Введите пространство имен...'}
        />
      )}
    />
  )
}

SearchNamespace.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
}
