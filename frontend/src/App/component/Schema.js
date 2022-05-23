import React from 'react'
import PropTypes from 'prop-types'
import {
  Tooltip,
  Chip
} from '@mui/material'

export default function Schema ({ schema }) {
  return (
    <Tooltip
      placement={'top'}
      title={
        <pre>
          {JSON.stringify(schema, null, ' '.repeat(2))}
        </pre>
      }
    >
      <Chip
        size={'small'}
        color={'success'}
        variant={'outlined'}
        label={schema.type}
      />
    </Tooltip>
  )
}

Schema.propTypes = {
  schema: PropTypes.object
}
