import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { DeleteButton } from '../component'

export default function DeleteStatus ({ status, onDelete }) {
  const deleteStatus = useCallback(async () => {
    try {
      await StatusAPI.deleteStatus(status.statusId)

      onDelete()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось удалить статус'
      })
    }
  })

  return <DeleteButton onClick={deleteStatus} />
}

DeleteStatus.propTypes = {
  status: PropTypes.object,
  onDelete: PropTypes.func
}
