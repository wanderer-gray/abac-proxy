import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  ContainerHeader,
  ContainerSearch,
  ContainerTable,
  SearchOffice,
  SearchPosition
} from '../../component'
import { Grid } from '@mui/material'
import CreateEmployee from './CreateEmployee'
import UpdateEmployee from './UpdateEmployee'
import DeleteEmployee from './DeleteEmployee'
import { wait } from '../../utils'

const columns = [
  {
    name: 'office',
    path: ['office', 'name'],
    title: 'Офис'
  },
  {
    name: 'position',
    path: ['position', 'name'],
    title: 'Должность'
  },
  {
    name: 'action',
    align: 'right'
  }
]

const getOffice = (id) =>
  OfficeAPI.getOffice(id)

const getPosition = (id) =>
  PositionAPI.getPosition(id)

const getEmployee = async (id) => {
  const employee = await EmployeeAPI.getEmployee(id)

  const {
    employeeId,
    officeId,
    positionId
  } = employee

  const [
    office,
    position
  ] = await Promise.all([
    getOffice(officeId),
    getPosition(positionId)
  ])

  return {
    employeeId,
    office,
    position
  }
}

const getEmployees = (ids) =>
  wait(ids.map(getEmployee))

const searchEmployees = async (filter) => {
  try {
    const ids = await EmployeeAPI.searchEmployees(filter)

    return getEmployees(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список сотрудника'
    })
  }

  return []
}

function getFilter (userId, office, position) {
  const filter = { userId }

  if (office) {
    filter.officeId = office.officeId
  }

  if (position) {
    filter.positionId = position.positionId
  }

  return filter
}

export default function Employees ({ userId }) {
  const [office, setOffice] = useState(null)
  const [position, setPosition] = useState(null)
  const [employees, setEmployees] = useState([])

  const refresh = useCallback(async () => {
    const filter = getFilter(userId, office, position)

    const employees = await searchEmployees(filter)

    setEmployees(employees)
  })

  useEffect(() => { refresh() }, [office, position])

  return (
    <Container>
      <ContainerHeader
        title={'Сотрудник'}
        create={(
          <CreateEmployee
            userId={userId}
            onCreate={refresh}
          />
        )}
      />

      <ContainerSearch>
        <Grid
          container={true}
          spacing={1}
        >
          <Grid
            item={true}
            xs={6}
          >
            <SearchOffice
              size={'small'}
              value={office}
              onChange={setOffice}
            />
          </Grid>
          <Grid
            item={true}
            xs={6}
          >
            <SearchPosition
              size={'small'}
              value={position}
              onChange={setPosition}
            />
          </Grid>
        </Grid>
      </ContainerSearch>

      <ContainerTable
        size={'small'}
        columns={columns}
        rows={
          employees.map((employee) => {
            return {
              key: employee.employeeId,
              office: employee.office,
              position: employee.position,
              action: (
                <>
                  <UpdateEmployee
                    employee={employee}
                    onUpdate={refresh}
                  />
                  <DeleteEmployee
                    employee={employee}
                    onDelete={refresh}
                  />
                </>
              )
            }
          })
        }
      />
    </Container>
  )
}

Employees.propTypes = {
  userId: PropTypes.string
}
