import React, {
  useState,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import {
  EditButton,
  Dialog
} from '../component'
import { TextField } from '@mui/material'

function getRoleData (role, { name }) {
  const roleData = {}

  if (role.name !== name) {
    roleData.name = name
  }

  return roleData
}

export default function UpdateRole ({ role, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(role.name)

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const updateRole = useCallback(async () => {
    const roleData = getRoleData(role, { name })

    if (!Object.keys(roleData).length) {
      onClose()

      return
    }

    try {
      await RoleAPI.updateRole(role.roleId, roleData)

      onClose()
      onUpdate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось изменить роль'
      })
    }
  })

  return (
    <>
      <EditButton onClick={onOpen} />

      <Dialog
        title={'Редактирование роли'}
        open={open}
        onClose={onClose}
        onSave={updateRole}
      >
        <TextField
          label={'Название'}
          placeholder={'Введите название...'}
          fullWidth={true}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Dialog>
    </>
  )
}

UpdateRole.propTypes = {
  role: PropTypes.object,
  onUpdate: PropTypes.func
}
