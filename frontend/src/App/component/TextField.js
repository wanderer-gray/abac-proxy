import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@mui/material'

export default function MyTextField ({
  label,
  placeholder,
  value,
  onChange,
  onChangeValue,
  errorText,
  ...props
}) {
  const OnChange = useCallback((event) => {
    onChange?.(event)
    onChangeValue?.(event.target.value)
  })

  return (
    <TextField
      {...props}
      label={label}
      placeholder={placeholder}
      fullWidth={true}
      value={value}
      onChange={OnChange}
      helperText={errorText}
    />
  )
}

MyTextField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onChangeValue: PropTypes.func,
  errorText: PropTypes.string
}
