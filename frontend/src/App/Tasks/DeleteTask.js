import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { DeleteButton } from '../component'

export default function DeleteTask ({ task, onDelete }) {
  const deleteTask = useCallback(async () => {
    try {
      await TaskAPI.deleteTask(task.taskId)

      onDelete()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось удалить задачу'
      })
    }
  })

  return <DeleteButton onClick={deleteTask} />
}

DeleteTask.propTypes = {
  task: PropTypes.object,
  onDelete: PropTypes.func
}
