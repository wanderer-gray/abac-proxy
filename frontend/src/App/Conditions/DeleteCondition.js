import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { DeleteButton } from '../component'

export default function DeleteCondition ({ condition, onDelete }) {
  const onDeleteCondition = useCallback(async () => {
    try {
      await ConditionAPI.deleteCondition(condition.conditionId)

      onDelete()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось удалить цель'
      })
    }
  })

  return <DeleteButton onClick={onDeleteCondition} />
}

DeleteCondition.propTypes = {
  condition: PropTypes.object,
  onDelete: PropTypes.func
}
