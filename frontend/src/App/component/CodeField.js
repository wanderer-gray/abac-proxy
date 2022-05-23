import React from 'react'
import PropTypes from 'prop-types'
import TextField from './TextField'

export default function CodeField ({
  label,
  placeholder,
  value,
  onChangeValue,
  ...props
}) {
  return (
    <TextField
      {...props}
      label={label}
      placeholder={placeholder}
      multiline={true}
      value={value}
      onChangeValue={onChangeValue}
    />
  )
}

CodeField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeValue: PropTypes.func
}
