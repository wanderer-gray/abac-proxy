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
  SearchRole,
  SearchUser
} from '../../component'
import { Grid } from '@mui/material'
import CreateMember from './CreateMember'
import UpdateMember from './UpdateMember'
import DeleteMember from './DeleteMember'
import { wait } from '../../utils'

const columns = [
  {
    name: 'role',
    path: ['role', 'name'],
    title: 'Роль'
  },
  {
    name: 'user',
    path: ['user', 'nickname'],
    title: 'Пользователь'
  },
  {
    name: 'action',
    align: 'right'
  }
]

const getRole = (id) =>
  RoleAPI.getRole(id)

const getUser = (id) =>
  UserAPI.getUser(id)

const getMember = async (id) => {
  const member = await MemberAPI.getMember(id)

  const {
    memberId,
    roleId,
    userId
  } = member

  const [
    role,
    user
  ] = await Promise.all([
    getRole(roleId),
    getUser(userId)
  ])

  return {
    memberId,
    role,
    user
  }
}

const getMembers = (ids) =>
  wait(ids.map(getMember))

const searchMembers = async (filter) => {
  try {
    const ids = await MemberAPI.searchMembers(filter)

    return getMembers(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список участников'
    })
  }

  return []
}

function getFilter (taskId, role, user) {
  const filter = { taskId }

  if (role) {
    filter.roleId = role.roleId
  }

  if (user) {
    filter.userId = user.userId
  }

  return filter
}

export default function Members ({ taskId }) {
  const [role, setRole] = useState(null)
  const [user, setUser] = useState(null)
  const [members, setMembers] = useState([])

  const refresh = useCallback(async () => {
    const filter = getFilter(taskId, role, user)

    const members = await searchMembers(filter)

    setMembers(members)
  })

  useEffect(() => { refresh() }, [role, user])

  return (
    <Container>
      <ContainerHeader
        title={'Участники'}
        create={(
          <CreateMember
            taskId={taskId}
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
            <SearchRole
              size={'small'}
              value={role}
              onChange={setRole}
            />
          </Grid>
          <Grid
            item={true}
            xs={6}
          >
            <SearchUser
              size={'small'}
              value={user}
              onChange={setUser}
            />
          </Grid>
        </Grid>
      </ContainerSearch>

      <ContainerTable
        size={'small'}
        columns={columns}
        rows={
          members.map((member) => {
            return {
              key: member.memberId,
              role: member.role,
              user: member.user,
              action: (
                <>
                  <UpdateMember
                    member={member}
                    onUpdate={refresh}
                  />
                  <DeleteMember
                    member={member}
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

Members.propTypes = {
  taskId: PropTypes.string
}
