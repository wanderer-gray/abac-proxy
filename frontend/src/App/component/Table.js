import React, {
  Fragment,
  useState
} from 'react'
import PropTypes from 'prop-types'
import CollapseButton from './CollapseButton'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Collapse,
  Paper
} from '@mui/material'

function getRowValueByPath (row, path) {
  if (!path.length) {
    return row
  }

  const [key, ...next] = path

  return getRowValueByPath(row[key], next)
}

function getRowValue (row, { name, path }) {
  if (path) {
    return getRowValueByPath(row, path)
  }

  return row[name]
}

function MyTableRow ({
  columns,
  row: { collapse, ...row }
}) {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'none' } }}>
        {columns.map(({ name, path, align }) => (
          <TableCell
            key={name}
            variant={'body'}
            align={align}
            width={name === 'collapse' ? '24px' : undefined}
          >
            {name === 'collapse'
              ? (
                  <CollapseButton
                    open={open}
                    setOpen={setOpen}
                  />
                )
              : getRowValue(row, { name, path })}
          </TableCell>
        ))}
      </TableRow>

      {collapse
        ? (
            <TableRow sx={{ '& > *': { borderBottom: 'none' } }}>
              <TableCell
                colSpan={columns.length}
                variant={'body'}
                sx={{
                  paddingBottom: 0,
                  paddingTop: 0
                }}
              >
                <Collapse
                  in={open}
                  timeout={'auto'}
                  unmountOnExit={true}
                >
                  <Paper
                    elevation={0}
                    square={true}
                    variant={'outlined'}
                    sx={{
                      marginTop: 1,
                      marginBottom: 1,
                      padding: 1
                    }}
                  >
                    {collapse}
                  </Paper>
                </Collapse>
              </TableCell>
            </TableRow>
          )
        : null}
    </Fragment>
  )
}

MyTableRow.propTypes = {
  columns: PropTypes.array,
  row: PropTypes.object
}

export default function MyTable ({
  size,
  columns,
  rows
}) {
  return (
    <TableContainer>
      <Table size={size}>
        <TableHead>
          <TableRow>
            {columns.map(({ name, title, align }) => (
              <TableCell
                key={name}
                variant={'head'}
                align={align}
              >
                {title ?? null}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map(({ key, ...row }) => (
            <MyTableRow
              key={key}
              columns={columns}
              row={row}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

MyTable.propTypes = {
  size: PropTypes.string,
  columns: PropTypes.array,
  rows: PropTypes.array
}
