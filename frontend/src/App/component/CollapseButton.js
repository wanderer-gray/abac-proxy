import React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

export default function CollapseButton ({
  open,
  setOpen
}) {
  return (
    <IconButton
      size={'small'}
      onClick={() => setOpen(!open)}
    >
      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </IconButton>
  )
}

CollapseButton.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func
}
