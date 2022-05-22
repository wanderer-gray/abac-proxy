import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { DeleteButton } from '../component'

export default function DeleteOffice ({ office, onDelete }) {
  const deleteOffice = useCallback(async () => {
    try {
      await OfficeAPI.deleteOffice(office.officeId)

      onDelete()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось удалить офис'
      })
    }
  })

  return <DeleteButton onClick={deleteOffice} />
}

DeleteOffice.propTypes = {
  office: PropTypes.object,
  onDelete: PropTypes.func
}
