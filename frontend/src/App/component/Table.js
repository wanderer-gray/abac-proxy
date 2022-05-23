import React, {
  Fragment,
  useState,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import VTable from './VTable'
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

function getRowValueConverted (value, convert) {
  if (!convert) {
    return value
  }

  return convert(value)
}

function getRowValue (row, { vertical, columns, path, name, convert }) {
  if (vertical) {
    return (
      <VTable
        size={'small'}
        columns={columns}
        row={row}
      />
    )
  }

  const value = getRowValueByPath(row, path ?? [name])

  return getRowValueConverted(value, convert)
}

function MyTableRow ({
  columns,
  row
}) {
  const [opens, setOpens] = useState({})

  const onOpen = useCallback((name) => {
    return () => {
      setOpens({
        ...opens,
        [name]: !opens[name]
      })
    }
  })

  return (
    <Fragment>
      <TableRow>
        {columns.map((column) => {
          const { collapse, name, align } = column

          return (
            <TableCell
              key={name}
              sx={{ verticalAlign: 'baseline' }}
              variant={'body'}
              align={align}
            >
              {collapse
                ? (
                    <CollapseButton
                      open={opens[name]}
                      setOpen={onOpen(name)}
                    />
                  )
                : getRowValue(row, column)}
            </TableCell>
          )
        })}
      </TableRow>

      {columns.map(({ collapse, name, convert }) => {
        if (!collapse) {
          return null
        }

        return (
          <TableRow
            key={name}
            sx={{ '& > *': { border: 'none' } }}
          >
            <TableCell
              colSpan={columns.length}
              variant={'body'}
              sx={{
                paddingBottom: 0,
                paddingTop: 0
              }}
            >
              <Collapse
                in={opens[name]}
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
                  {convert(row)}
                </Paper>
              </Collapse>
            </TableCell>
          </TableRow>
        )
      })}
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
            {columns.map(({ name, sx, align, title }) => (
              <TableCell
                key={name}
                variant={'head'}
                sx={sx}
                align={align}
              >
                {title}
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
