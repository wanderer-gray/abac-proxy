import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { DeleteButton } from '../../component'

export default function DeletePolicyRule ({ policyRule, onDelete }) {
  const onDeletePolicyRule = useCallback(async () => {
    try {
      await PolicyAPI.deletePolicyRule(policyRule.policyRuleId)

      onDelete()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось удалить правило политики'
      })
    }
  })

  return <DeleteButton onClick={onDeletePolicyRule} />
}

DeletePolicyRule.propTypes = {
  policyRule: PropTypes.object,
  onDelete: PropTypes.func
}
