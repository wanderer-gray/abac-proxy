import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { DeleteButton } from '../component'

export default function DeleteOffice ({ position, onDelete }) {
  const deletePosition = useCallback(async () => {
    try {
      await PositionAPI.deletePosition(position.positionId)

      onDelete()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось удалить должность'
      })
    }
  })

  return <DeleteButton onClick={deletePosition} />
}

DeleteOffice.propTypes = {
  position: PropTypes.object,
  onDelete: PropTypes.func
}
