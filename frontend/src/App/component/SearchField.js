import React from 'react'
import PropTypes from 'prop-types'
import TextField from './TextField'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchField ({
  label,
  placeholder,
  value,
  onChangeValue
}) {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeValue={onChangeValue}
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
  onChangeValue: PropTypes.func
}
