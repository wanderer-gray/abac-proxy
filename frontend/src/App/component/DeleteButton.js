import React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default function DeleteButton ({ onClick }) {
  return (
    <IconButton
      color={'error'}
      variant={'outlined'}
      onClick={onClick}
    >
      <DeleteIcon />
    </IconButton>
  )
}

DeleteButton.propTypes = {
  onClick: PropTypes.func
}
