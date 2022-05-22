import React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

export default function EditButton ({ onClick }) {
  return (
    <IconButton
      color={'default'}
      variant={'outlined'}
      onClick={onClick}
    >
      <EditIcon />
    </IconButton>
  )
}

EditButton.propTypes = {
  onClick: PropTypes.func
}
