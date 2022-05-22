import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'

export default function Container ({ children }) {
  return (
    <Grid
      container={true}
      spacing={4}
    >
      {children}
    </Grid>
  )
}

Container.propTypes = {
  children: PropTypes.node
}
