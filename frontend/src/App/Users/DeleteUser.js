import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { DeleteButton } from '../component'

export default function DeleteUser ({ user, onDelete }) {
  const deleteUser = useCallback(async () => {
    try {
      await UserAPI.deleteUser(user.userId)

      onDelete()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось удалить пользователя'
      })
    }
  })

  return <DeleteButton onClick={deleteUser} />
}

DeleteUser.propTypes = {
  user: PropTypes.object,
  onDelete: PropTypes.func
}
