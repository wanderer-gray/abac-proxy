import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import {
  Container,
  ContainerHeader,
  ContainerSearch,
  ContainerTable,
  SearchField
} from '../component'
import CreateRole from './CreateRole'
import UpdateRole from './UpdateRole'
import DeleteRole from './DeleteRole'
import { wait } from '../utils'

const columns = [
  {
    name: 'name',
    title: 'Название'
  },
  {
    name: 'action',
    align: 'right'
  }
]

const getRole = (id) =>
  RoleAPI.getRole(id)

const getRoles = (ids) =>
  wait(ids.map(getRole))

const searchRoles = async (name) => {
  try {
    const ids = await RoleAPI.searchRoles(name)

    return getRoles(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список ролей'
    })
  }

  return []
}

export default function Roles () {
  const [name, setName] = useState('')
  const [roles, setRoles] = useState([])

  const refresh = useCallback(async () => {
    const roles = await searchRoles(name)

    setRoles(roles)
  })

  useEffect(() => { refresh() }, [name])

  return (
    <Container>
      <ContainerHeader
        title={'Роли'}
        create={<CreateRole onCreate={refresh} />}
      />

      <ContainerSearch>
        <SearchField
          label={'Название'}
          placeholder={'Введите название...'}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </ContainerSearch>

      <ContainerTable
        columns={columns}
        rows={
          roles.map((role) => {
            return {
              key: role.roleId,
              name: role.name,
              action: (
                <>
                  <UpdateRole
                    role={role}
                    onUpdate={refresh}
                  />
                  <DeleteRole
                    role={role}
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
