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

const getUser = (id) =>
  UserAPI.getUser(id)

const getUsers = (ids) =>
  wait(ids.map(getUser))

const searchUsers = async (nickname) => {
  try {
    const ids = await UserAPI.searchUsers(nickname)

    return getUsers(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список пользователей'
    })
  }

  return []
}

export default function SearchUser ({
  value,
  onChange,
  ...props
}) {
  const [nickname, setNickname] = useState('')
  const [users, setUsers] = useState([])

  const refresh = useCallback(async () => {
    const users = await searchUsers(nickname)

    setUsers(users)
  })

  useEffect(() => { refresh() }, [nickname])

  return (
    <Autocomplete
      {...props}
      id={'SearchUser'}
      getOptionLabel={(user) => user.nickname}
      value={value}
      onChange={(_, value) => {
        onChange(value)
      }}
      inputValue={nickname}
      onInputChange={(_, name) => setNickname(name)}
      options={users}
      renderInput={(params) => (
        <TextField
          {...params}
          label={'Пользователь'}
          placeholder={'Введите пользователь...'}
        />
      )}
    />
  )
}

SearchUser.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
}
