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

export default function CreateRole ({ onCreate }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const createRole = useCallback(async () => {
    try {
      await RoleAPI.createRole(uuid(), name)

      onClose()
      onCreate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось создать роль'
      })
    }
  })

  return (
    <>
      <AddButton onClick={onOpen} />

      <Dialog
        title={'Создание роли'}
        open={open}
        onClose={onClose}
        onSave={createRole}
      >
        <TextField
          label={'Название'}
          placeholder={'Введите название...'}
          fullWidth={true}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Dialog>
    </>
  )
}

CreateRole.propTypes = {
  onCreate: PropTypes.func
}
