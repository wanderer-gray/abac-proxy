import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Typography
} from '@mui/material'

export default function ContainerHeader ({
  title,
  create
}) {
  return (
    <Grid
      item={true}
      xs={12}
      display={'flex'}
      alignItems={'center'}
    >
      {create}

      <Typography variant={'h5'}>{title}</Typography>
    </Grid>
  )
}

ContainerHeader.propTypes = {
  title: PropTypes.string,
  create: PropTypes.node
}
