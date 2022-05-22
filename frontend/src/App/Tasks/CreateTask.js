import React, {
  useState,
  useMemo,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import {
  AddButton,
  Dialog,
  SearchStatus
} from '../component'
import { TextField } from '@mui/material'
import { uuid } from '../utils'

export default function CreateTask ({ onCreate }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState(null)

  const statusId = useMemo(() => status?.statusId, [status])

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const createTask = useCallback(async () => {
    if (!statusId) {
      nofity({
        variant: 'warning',
        message: 'Необходимо указать статус'
      })

      return
    }

    try {
      await TaskAPI.createTask(uuid(), title, statusId)

      onClose()
      onCreate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось создать задачу'
      })
    }
  })

  return (
    <>
      <AddButton onClick={onOpen} />

      <Dialog
        title={'Создание задачи'}
        open={open}
        onClose={onClose}
        onSave={createTask}
      >
        <TextField
          label={'Заголовок'}
          placeholder={'Введите заголовок...'}
          fullWidth={true}
          sx={{ marginBottom: 1 }}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <SearchStatus
          value={status}
          onChange={setStatus}
        />
      </Dialog>
    </>
  )
}

CreateTask.propTypes = {
  onCreate: PropTypes.func
}
