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

function getPositionData (position, { name }) {
  const positionData = {}

  if (position.name !== name) {
    positionData.name = name
  }

  return positionData
}

export default function UpdatePosition ({ position, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(position.name)

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const updatePosition = useCallback(async () => {
    const positionData = getPositionData(position, { name })

    if (!Object.keys(positionData).length) {
      onClose()

      return
    }

    try {
      await PositionAPI.updatePosition(position.positionId, positionData)

      onClose()
      onUpdate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось изменить должность'
      })
    }
  })

  return (
    <>
      <EditButton onClick={onOpen} />

      <Dialog
        title={'Редактирование должности'}
        open={open}
        onClose={onClose}
        onSave={updatePosition}
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

UpdatePosition.propTypes = {
  position: PropTypes.object,
  onUpdate: PropTypes.func
}
