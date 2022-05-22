import React, {
  useState,
  useMemo,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import {
  EditButton,
  Dialog,
  SearchRole,
  SearchUser
} from '../../component'

function getMemberData (member, { roleId, userId }) {
  const memberData = {}

  if (member.roleId !== roleId) {
    memberData.roleId = roleId
  }

  if (member.userId !== userId) {
    memberData.userId = userId
  }

  return memberData
}

export default function UpdateMember ({ member, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState(member.role)
  const [user, setUser] = useState(member.user)

  const roleId = useMemo(() => role?.roleId, [role])
  const userId = useMemo(() => user?.userId, [user])

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const updateMember = useCallback(async () => {
    if (!roleId || !userId) {
      nofity({
        variant: 'warning',
        message: 'Необходимо указать роль и пользователя'
      })

      return
    }

    const memberData = getMemberData(member, { roleId, userId })

    if (!Object.keys(memberData).length) {
      onClose()

      return
    }

    try {
      await MemberAPI.updateMember(member.memberId, memberData)

      onClose()
      onUpdate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось изменить участника'
      })
    }
  })

  return (
    <>
      <EditButton onClick={onOpen} />

      <Dialog
        title={'Редактирование участника'}
        open={open}
        onClose={onClose}
        onSave={updateMember}
      >
        <SearchRole
          sx={{ marginBottom: 1 }}
          value={role}
          onChange={setRole}
        />
        <SearchUser
          value={user}
          onChange={setUser}
        />
      </Dialog>
    </>
  )
}

UpdateMember.propTypes = {
  member: PropTypes.object,
  onUpdate: PropTypes.func
}
