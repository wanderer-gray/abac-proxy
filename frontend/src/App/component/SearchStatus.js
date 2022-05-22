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

const getStatus = (id) =>
  StatusAPI.getStatus(id)

const getStatuses = (ids) =>
  wait(ids.map(getStatus))

const searchStatuses = async (name) => {
  try {
    const ids = await StatusAPI.searchStatuses(name)

    return getStatuses(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список статусов'
    })
  }

  return []
}

export default function SearchStatus ({
  value,
  onChange,
  ...props
}) {
  const [name, setName] = useState('')
  const [statuses, setStatuses] = useState([])

  const refresh = useCallback(async () => {
    const statuses = await searchStatuses(name)

    setStatuses(statuses)
  })

  useEffect(() => { refresh() }, [name])

  return (
    <Autocomplete
      {...props}
      id={'SearchStatus'}
      getOptionLabel={(status) => status.name}
      value={value}
      onChange={(_, value) => {
        onChange(value)
      }}
      inputValue={name}
      onInputChange={(_, name) => setName(name)}
      options={statuses}
      renderInput={(params) => (
        <TextField
          {...params}
          label={'Статус'}
          placeholder={'Введите статус...'}
        />
      )}
    />
  )
}

SearchStatus.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
}
