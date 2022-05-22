import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'

export default function ContainerSearch ({ children }) {
  return (
    <Grid
      item={true}
      xs={12}
    >
      {children}
    </Grid>
  )
}

ContainerSearch.propTypes = {
  children: PropTypes.node
}
