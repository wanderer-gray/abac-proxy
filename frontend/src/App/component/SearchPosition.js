import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import {
  TextField,
  Autocomplete
} from '@mui/material'
import { wait } from '../utils'

const getPosition = (id) =>
  PositionAPI.getPosition(id)

const getPositions = (ids) =>
  wait(ids.map(getPosition))

const searchPositions = async (name) => {
  try {
    const ids = await PositionAPI.searchPositions(name)

    return getPositions(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список должностей'
    })
  }

  return []
}

export default function SearchPosition ({
  value,
  onChange,
  ...props
}) {
  const [name, setName] = useState('')
  const [positions, setPositions] = useState([])

  const refresh = useCallback(async () => {
    const positions = await searchPositions(name)

    setPositions(positions)
  })

  useEffect(() => { refresh() }, [name])

  return (
    <Autocomplete
      {...props}
      id={'SearchPosition'}
      getOptionLabel={(office) => office.name}
      value={value}
      onChange={(_, value) => {
        onChange(value)
      }}
      inputValue={name}
      onInputChange={(_, name) => setName(name)}
      options={positions}
      renderInput={(params) => (
        <TextField
          {...params}
          label={'Должность'}
          placeholder={'Введите должность...'}
        />
      )}
    />
  )
}

SearchPosition.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
}
