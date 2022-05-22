import React from 'react'
import PropTypes from 'prop-types'
import Table from './Table'
import { Grid } from '@mui/material'

export default function ContainerTable ({
  size,
  columns,
  rows
}) {
  return (
    <Grid
      item={true}
      xs={12}
    >
      <Table
        size={size}
        columns={columns}
        rows={rows}
      />
    </Grid>
  )
}

ContainerTable.propTypes = {
  size: PropTypes.string,
  columns: PropTypes.array,
  rows: PropTypes.array
}
