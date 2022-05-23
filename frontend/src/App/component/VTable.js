import React from 'react'
import PropTypes from 'prop-types'
import {
  TableContainer,
  Table,
  TableRow,
  TableCell
} from '@mui/material'

function getRowValueByPath (row, path) {
  if (!path.length) {
    return row
  }

  const [key, ...next] = path

  return getRowValueByPath(row[key], next)
}

function getRowValueConverted (value, convert) {
  if (!convert) {
    return value
  }

  return convert(value)
}

function getRowValue (row, { path, name, convert }) {
  const value = getRowValueByPath(row, path ?? [name])

  return getRowValueConverted(value, convert)
}

export default function MyVTable ({
  size,
  columns,
  row
}) {
  return (
    <TableContainer>
      <Table size={size}>
        {columns.map((column) => {
          const { name, title } = column

          return (
            <TableRow key={name}>
              <TableCell variant={'head'}>{title}</TableCell>
              <TableCell>{getRowValue(row, column)}</TableCell>
            </TableRow>
          )
        })}
      </Table>
    </TableContainer>
  )
}

MyVTable.propTypes = {
  size: PropTypes.string,
  columns: PropTypes.array,
  row: PropTypes.object
}
