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

export default function CreateOffice ({ onCreate }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const createOffice = useCallback(async () => {
    try {
      await OfficeAPI.createOffice(uuid(), name)

      onClose()
      onCreate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось создать офис'
      })
    }
  })

  return (
    <>
      <AddButton onClick={onOpen} />

      <Dialog
        title={'Создание офиса'}
        open={open}
        onClose={onClose}
        onSave={createOffice}
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

CreateOffice.propTypes = {
  onCreate: PropTypes.func
}
