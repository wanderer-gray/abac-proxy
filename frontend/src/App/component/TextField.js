import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@mui/material'

export default function MyTextField ({
  label,
  placeholder,
  value,
  onChangeValue,
  errorText,
  ...props
}) {
  return (
    <TextField
      {...props}
      label={label}
      placeholder={placeholder}
      fullWidth={true}
      value={value}
      onChange={(event) => onChangeValue(event.target.value)}
      helperText={errorText}
    />
  )
}

MyTextField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeValue: PropTypes.func,
  errorText: PropTypes.string
}
