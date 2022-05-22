import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchField ({
  label,
  placeholder,
  value,
  onChange
}) {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      fullWidth={true}
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <SearchIcon
            position={'start'}
            color={'primary'}
          />
        )
      }}
    />
  )
}

SearchField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}
