import React, {
  useState,
  useMemo,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import {
  EditButton,
  Dialog,
  SearchStatus
} from '../component'
import { TextField } from '@mui/material'

function getTaskData (task, { title, statusId }) {
  const taskData = {}

  if (task.title !== title) {
    taskData.title = title
  }

  if (task.statusId !== statusId) {
    taskData.statusId = statusId
  }

  return taskData
}

export default function UpdateTask ({ task, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [status, setStatus] = useState(task.status)

  const statusId = useMemo(() => status?.statusId, [status])

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const updateTask = useCallback(async () => {
    if (!statusId) {
      nofity({
        variant: 'warning',
        message: 'Необходимо указать статус'
      })

      return
    }

    const taskData = getTaskData(task, { title, statusId })

    if (!Object.keys(taskData).length) {
      onClose()

      return
    }

    try {
      await TaskAPI.updateTask(task.taskId, taskData)

      onClose()
      onUpdate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось изменить задачу'
      })
    }
  })

  return (
    <>
      <EditButton onClick={onOpen} />

      <Dialog
        title={'Редактирование задачи'}
        open={open}
        onClose={onClose}
        onSave={updateTask}
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

UpdateTask.propTypes = {
  task: PropTypes.object,
  onUpdate: PropTypes.func
}
