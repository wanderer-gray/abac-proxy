import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { DeleteButton } from '../../component'

export default function DeleteMember ({ member, onDelete }) {
  const deleteMember = useCallback(async () => {
    try {
      await MemberAPI.deleteMember(member.memberId)

      onDelete()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось удалить участника'
      })
    }
  })

  return <DeleteButton onClick={deleteMember} />
}

DeleteMember.propTypes = {
  member: PropTypes.object,
  onDelete: PropTypes.func
}
