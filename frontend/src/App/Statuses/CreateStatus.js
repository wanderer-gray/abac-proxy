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

export default function CreateStatus ({ onCreate }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const createStatus = useCallback(async () => {
    try {
      await StatusAPI.createStatus(uuid(), name)

      onClose()
      onCreate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось создать статус'
      })
    }
  })

  return (
    <>
      <AddButton onClick={onOpen} />

      <Dialog
        title={'Создание статуса'}
        open={open}
        onClose={onClose}
        onSave={createStatus}
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

CreateStatus.propTypes = {
  onCreate: PropTypes.func
}
