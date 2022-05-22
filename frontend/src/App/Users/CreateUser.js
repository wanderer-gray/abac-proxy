import React, {
  useState,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import {
  AddButton,
  Dialog
} from '../component'
import { TextField } from '@mui/material'
import { uuid } from '../utils'

export default function CreateUser ({ onCreate }) {
  const [open, setOpen] = useState(false)
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const createUser = useCallback(async () => {
    try {
      await UserAPI.createUser(uuid(), nickname, password)

      onClose()
      onCreate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось создать пользователя'
      })
    }
  })

  return (
    <>
      <AddButton onClick={onOpen} />

      <Dialog
        title={'Создание пользователя'}
        open={open}
        onClose={onClose}
        onSave={createUser}
      >
        <TextField
          sx={{ marginBottom: 1 }}
          label={'Логин'}
          placeholder={'Введите логин...'}
          fullWidth={true}
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />
        <TextField
          label={'Пароль'}
          placeholder={'Введите пароль...'}
          fullWidth={true}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Dialog>
    </>
  )
}

CreateUser.propTypes = {
  onCreate: PropTypes.func
}
