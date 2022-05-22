import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { DeleteButton } from '../component'

export default function DeleteRole ({ role, onDelete }) {
  const deleteRole = useCallback(async () => {
    try {
      await RoleAPI.deleteRole(role.roleId)

      onDelete()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось удалить роль'
      })
    }
  })

  return <DeleteButton onClick={deleteRole} />
}

DeleteRole.propTypes = {
  role: PropTypes.object,
  onDelete: PropTypes.func
}
