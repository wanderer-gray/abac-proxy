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
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import DeleteUser from './DeleteUser'
import Employees from './Employees'
import { wait } from '../utils'

const columns = [
  {
    name: 'collapse'
  },
  {
    name: 'nickname',
    title: 'Логин'
  },
  {
    name: 'action',
    align: 'right'
  }
]

const getUser = (id) =>
  UserAPI.getUser(id)

const getUsers = (ids) =>
  wait(ids.map(getUser))

const searchUsers = async (nickname) => {
  try {
    const ids = await UserAPI.searchUsers(nickname)

    return getUsers(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список пользователей'
    })
  }

  return []
}

export default function Users () {
  const [nickname, setNickname] = useState('')
  const [users, setUsers] = useState([])

  const refresh = useCallback(async () => {
    const users = await searchUsers(nickname)

    setUsers(users)
  })

  useEffect(() => { refresh() }, [nickname])

  return (
    <Container>
      <ContainerHeader
        title={'Пользователи'}
        create={<CreateUser onCreate={refresh} />}
      />

      <ContainerSearch>
        <SearchField
          label={'Логин'}
          placeholder={'Введите логин...'}
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />
      </ContainerSearch>

      <ContainerTable
        columns={columns}
        rows={
          users.map((user) => {
            const { userId } = user

            return {
              key: userId,
              nickname: user.nickname,
              action: (
                <>
                  <UpdateUser
                    user={user}
                    onUpdate={refresh}
                  />
                  <DeleteUser
                    user={user}
                    onDelete={refresh}
                  />
                </>
              ),
              collapse: <Employees userId={userId} />
            }
          })
        }
      />
    </Container>
  )
}
