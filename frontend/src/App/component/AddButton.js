import React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/AddCircleOutline'

export default function AddButton ({ onClick }) {
  return (
    <IconButton
      color={'primary'}
      variant={'outlined'}
      onClick={onClick}
    >
      <AddIcon />
    </IconButton>
  )
}

AddButton.propTypes = {
  onClick: PropTypes.func
}
