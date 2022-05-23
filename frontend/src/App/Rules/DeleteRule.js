import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { DeleteButton } from '../component'

export default function DeleteRule ({ rule, onDelete }) {
  const onDeleteRule = useCallback(async () => {
    try {
      await RuleAPI.deleteRule(rule.ruleId)

      onDelete()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось удалить правило'
      })
    }
  })

  return <DeleteButton onClick={onDeleteRule} />
}

DeleteRule.propTypes = {
  rule: PropTypes.object,
  onDelete: PropTypes.func
}
