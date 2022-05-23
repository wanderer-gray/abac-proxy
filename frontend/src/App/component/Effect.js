import React from 'react'
import PropTypes from 'prop-types'
import { Chip } from '@mui/material'

export default function Effect ({ effect }) {
  const { name } = effect

  return (
    <Chip
      size={'small'}
      color={name === 'permit' ? 'success' : 'error'}
      label={name}
    />
  )
}

Effect.propTypes = {
  effect: PropTypes.object
}
