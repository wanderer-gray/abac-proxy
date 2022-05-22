import React, {
  useState,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import {
  EditButton,
  Dialog
} from '../component'
import { TextField } from '@mui/material'

function getUserData (user, { nickname, password }) {
  const userData = {}

  if (user.nickname !== nickname) {
    userData.nickname = nickname
  }

  if (password) {
    userData.password = password
  }

  return userData
}

export default function UpdateUser ({ user, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [nickname, setNickname] = useState(user.nickname)
  const [password, setPassword] = useState('')

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const updateUser = useCallback(async () => {
    const userData = getUserData(user, { nickname, password })

    if (!Object.keys(userData).length) {
      onClose()

      return
    }

    try {
      await UserAPI.updateUser(user.userId, userData)

      onClose()
      onUpdate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось изменить пользователя'
      })
    }
  })

  return (
    <>
      <EditButton onClick={onOpen} />

      <Dialog
        title={'Редактирование пользователя'}
        open={open}
        onClose={onClose}
        onSave={updateUser}
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

UpdateUser.propTypes = {
  user: PropTypes.object,
  onUpdate: PropTypes.func
}
