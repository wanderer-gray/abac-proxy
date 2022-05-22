import React, {
  useState,
  useMemo,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import {
  AddButton,
  Dialog,
  SearchOffice,
  SearchPosition
} from '../../component'
import { uuid } from '../../utils'

export default function CreateEmployee ({
  userId,
  onCreate
}) {
  const [open, setOpen] = useState(false)
  const [office, setOffice] = useState(null)
  const [position, setPosition] = useState(null)

  const officeId = useMemo(() => office?.officeId, [office])
  const positionId = useMemo(() => position?.positionId, [position])

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const createEmployee = useCallback(async () => {
    if (!officeId || !positionId) {
      nofity({
        variant: 'warning',
        message: 'Необходимо указать офис и должность'
      })

      return
    }

    try {
      await EmployeeAPI.createEmployee(uuid(), userId, officeId, positionId)

      onClose()
      onCreate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось создать сотрудника'
      })
    }
  })

  return (
    <>
      <AddButton onClick={onOpen} />

      <Dialog
        title={'Создание сотрудника'}
        open={open}
        onClose={onClose}
        onSave={createEmployee}
      >
        <SearchOffice
          sx={{ marginBottom: 1 }}
          value={office}
          onChange={setOffice}
        />
        <SearchPosition
          value={position}
          onChange={setPosition}
        />
      </Dialog>
    </>
  )
}

CreateEmployee.propTypes = {
  userId: PropTypes.string,
  onCreate: PropTypes.func
}
