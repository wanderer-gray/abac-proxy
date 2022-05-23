import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { DeleteButton } from '../component'

export default function DeleteTarget ({ target, onDelete }) {
  const deleteTarget = useCallback(async () => {
    try {
      await TargetAPI.deleteTarget(target.targetId)

      onDelete()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось удалить цель'
      })
    }
  })

  return <DeleteButton onClick={deleteTarget} />
}

DeleteTarget.propTypes = {
  target: PropTypes.object,
  onDelete: PropTypes.func
}
