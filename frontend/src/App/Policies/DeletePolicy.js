import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { DeleteButton } from '../component'

export default function DeletePolicy ({ policy, onDelete }) {
  const onDeletePolicy = useCallback(async () => {
    try {
      await PolicyAPI.deletePolicy(policy.policyId)

      onDelete()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось удалить политику'
      })
    }
  })

  return <DeleteButton onClick={onDeletePolicy} />
}

DeletePolicy.propTypes = {
  policy: PropTypes.object,
  onDelete: PropTypes.func
}
