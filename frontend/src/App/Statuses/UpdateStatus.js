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

function getStatusData (status, { name }) {
  const statusData = {}

  if (status.name !== name) {
    statusData.name = name
  }

  return statusData
}

export default function UpdateStatus ({ status, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(status.name)

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const updateStatus = useCallback(async () => {
    const statusData = getStatusData(status, { name })

    if (!Object.keys(statusData).length) {
      onClose()

      return
    }

    try {
      await StatusAPI.updateStatus(status.statusId, statusData)

      onClose()
      onUpdate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось изменить статус'
      })
    }
  })

  return (
    <>
      <EditButton onClick={onOpen} />

      <Dialog
        title={'Редактирование статуса'}
        open={open}
        onClose={onClose}
        onSave={updateStatus}
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

UpdateStatus.propTypes = {
  status: PropTypes.object,
  onUpdate: PropTypes.func
}
