import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { DeleteButton } from '../component'

export default function DeletePolicySet ({ policySet, onDelete }) {
  const onDeletePolicySet = useCallback(async () => {
    try {
      await PolicySetAPI.deletePolicySet(policySet.policySetId)

      onDelete()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось удалить группу политик'
      })
    }
  })

  return <DeleteButton onClick={onDeletePolicySet} />
}

DeletePolicySet.propTypes = {
  policySet: PropTypes.object,
  onDelete: PropTypes.func
}
