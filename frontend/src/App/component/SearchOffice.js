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

const getOffice = (id) =>
  OfficeAPI.getOffice(id)

const getOffices = (ids) =>
  wait(ids.map(getOffice))

const searchOffices = async (name) => {
  try {
    const ids = await OfficeAPI.searchOffices(name)

    return getOffices(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список офисов'
    })
  }

  return []
}

export default function SearchOffice ({
  value,
  onChange,
  ...props
}) {
  const [name, setName] = useState('')
  const [offices, setOffices] = useState([])

  const refresh = useCallback(async () => {
    const offices = await searchOffices(name)

    setOffices(offices)
  })

  useEffect(() => { refresh() }, [name])

  return (
    <Autocomplete
      {...props}
      id={'SearchOffice'}
      getOptionLabel={(office) => office.name}
      value={value}
      onChange={(_, value) => {
        onChange(value)
      }}
      inputValue={name}
      onInputChange={(_, name) => setName(name)}
      options={offices}
      renderInput={(params) => (
        <TextField
          {...params}
          label={'Офис'}
          placeholder={'Введите офис...'}
        />
      )}
    />
  )
}

SearchOffice.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
}
