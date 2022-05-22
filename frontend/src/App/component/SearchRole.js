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

const getRole = (id) =>
  RoleAPI.getRole(id)

const getRoles = (ids) =>
  wait(ids.map(getRole))

const searchRoles = async (name) => {
  try {
    const ids = await RoleAPI.searchRoles(name)

    return getRoles(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список ролей'
    })
  }

  return []
}

export default function SearchRole ({
  value,
  onChange,
  ...props
}) {
  const [name, setName] = useState('')
  const [roles, setRoles] = useState([])

  const refresh = useCallback(async () => {
    const roles = await searchRoles(name)

    setRoles(roles)
  })

  useEffect(() => { refresh() }, [name])

  return (
    <Autocomplete
      {...props}
      id={'SearchRole'}
      getOptionLabel={(role) => role.name}
      value={value}
      onChange={(_, value) => {
        onChange(value)
      }}
      inputValue={name}
      onInputChange={(_, name) => setName(name)}
      options={roles}
      renderInput={(params) => (
        <TextField
          {...params}
          label={'Роль'}
          placeholder={'Введите роль...'}
        />
      )}
    />
  )
}

SearchRole.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
}
