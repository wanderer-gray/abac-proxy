import React, {
  useState,
  useMemo,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import {
  AddButton,
  Dialog,
  SearchRole,
  SearchUser
} from '../../component'
import { uuid } from '../../utils'

export default function CreateMember ({
  taskId,
  onCreate
}) {
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState(null)
  const [user, setUser] = useState(null)

  const roleId = useMemo(() => role?.roleId, [role])
  const userId = useMemo(() => user?.userId, [user])

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const createMember = useCallback(async () => {
    if (!roleId || !userId) {
      nofity({
        variant: 'warning',
        message: 'Необходимо указать роль и пользователя'
      })

      return
    }

    try {
      await MemberAPI.createMember(uuid(), taskId, roleId, userId)

      onClose()
      onCreate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось создать участника'
      })
    }
  })

  return (
    <>
      <AddButton onClick={onOpen} />

      <Dialog
        title={'Создание участника'}
        open={open}
        onClose={onClose}
        onSave={createMember}
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

CreateMember.propTypes = {
  taskId: PropTypes.string,
  onCreate: PropTypes.func
}
