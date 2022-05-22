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

function getOfficeData (office, { name }) {
  const officeData = {}

  if (office.name !== name) {
    officeData.name = name
  }

  return officeData
}

export default function UpdateOffice ({ office, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(office.name)

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const updateOffice = useCallback(async () => {
    const officeData = getOfficeData(office, { name })

    if (!Object.keys(officeData).length) {
      onClose()

      return
    }

    try {
      await OfficeAPI.updateOffice(office.officeId, officeData)

      onClose()
      onUpdate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось изменить офис'
      })
    }
  })

  return (
    <>
      <EditButton onClick={onOpen} />

      <Dialog
        title={'Редактирование офиса'}
        open={open}
        onClose={onClose}
        onSave={updateOffice}
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

UpdateOffice.propTypes = {
  office: PropTypes.object,
  onUpdate: PropTypes.func
}
