import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { DeleteButton } from '../../component'

export default function DeletePolicySetPolicy ({ policySetPolicy, onDelete }) {
  const onDeletePolicySetPolicy = useCallback(async () => {
    try {
      await PolicySetAPI.deletePolicySetPolicy(policySetPolicy.policySetPolicyId)

      onDelete()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось удалить политику группы'
      })
    }
  })

  return <DeleteButton onClick={onDeletePolicySetPolicy} />
}

DeletePolicySetPolicy.propTypes = {
  policySetPolicy: PropTypes.object,
  onDelete: PropTypes.func
}
