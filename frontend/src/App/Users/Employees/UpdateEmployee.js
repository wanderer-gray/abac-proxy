import React, {
  useState,
  useMemo,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import {
  EditButton,
  Dialog,
  SearchOffice,
  SearchPosition
} from '../../component'

function getEmployeeData (employee, { officeId, positionId }) {
  const employeeData = {}

  if (employee.officeId !== officeId) {
    employeeData.officeId = officeId
  }

  if (employee.positionId !== positionId) {
    employeeData.positionId = positionId
  }

  return employeeData
}

export default function UpdateEmployee ({ employee, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [office, setOffice] = useState(employee.office)
  const [position, setPosition] = useState(employee.position)

  const officeId = useMemo(() => office?.officeId, [office])
  const positionId = useMemo(() => position?.positionId, [position])

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const updateOffice = useCallback(async () => {
    if (!officeId || !positionId) {
      nofity({
        variant: 'warning',
        message: 'Необходимо указать офис и должность'
      })

      return
    }

    const employeeData = getEmployeeData(employee, { officeId, positionId })

    if (!Object.keys(employeeData).length) {
      onClose()

      return
    }

    try {
      await EmployeeAPI.updateEmployee(employee.employeeId, employeeData)

      onClose()
      onUpdate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось изменить сотрудника'
      })
    }
  })

  return (
    <>
      <EditButton onClick={onOpen} />

      <Dialog
        title={'Редактирование сотрудника'}
        open={open}
        onClose={onClose}
        onSave={updateOffice}
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

UpdateEmployee.propTypes = {
  employee: PropTypes.object,
  onUpdate: PropTypes.func
}
