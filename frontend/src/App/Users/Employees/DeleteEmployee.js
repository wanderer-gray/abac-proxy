import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { DeleteButton } from '../../component'

export default function DeleteEmployee ({ employee, onDelete }) {
  const deleteEmployee = useCallback(async () => {
    try {
      await EmployeeAPI.deleteEmployee(employee.employeeId)

      onDelete()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось удалить сотрудника'
      })
    }
  })

  return <DeleteButton onClick={deleteEmployee} />
}

DeleteEmployee.propTypes = {
  employee: PropTypes.object,
  onDelete: PropTypes.func
}
