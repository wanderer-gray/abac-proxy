import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material'

export default function MyDialog ({
  open,
  title,
  onClose,
  onSave,
  children
}) {
  return (
    <Dialog
      fullWidth={true}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent dividers={true}>
        {children}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={onSave}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  )
}

MyDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  children: PropTypes.node
}
