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

export default function CreatePosition ({ onCreate }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const createPosition = useCallback(async () => {
    try {
      await PositionAPI.createPosition(uuid(), name)

      onClose()
      onCreate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось создать должность'
      })
    }
  })

  return (
    <>
      <AddButton onClick={onOpen} />

      <Dialog
        title={'Создание должности'}
        open={open}
        onClose={onClose}
        onSave={createPosition}
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

CreatePosition.propTypes = {
  onCreate: PropTypes.func
}
