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
import CreateStatus from './CreateStatus'
import UpdateStatus from './UpdateStatus'
import DeleteStatus from './DeleteStatus'
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

const getStatus = (id) =>
  StatusAPI.getStatus(id)

const getStatuses = (ids) =>
  wait(ids.map(getStatus))

const searchStatuses = async (name) => {
  try {
    const ids = await StatusAPI.searchStatuses(name)

    return getStatuses(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список статусов'
    })
  }

  return []
}

export default function Statuses () {
  const [name, setName] = useState('')
  const [statuses, setStatuses] = useState([])

  const refresh = useCallback(async () => {
    const statuses = await searchStatuses(name)

    setStatuses(statuses)
  })

  useEffect(() => { refresh() }, [name])

  return (
    <Container>
      <ContainerHeader
        title={'Статусы'}
        create={<CreateStatus onCreate={refresh} />}
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
          statuses.map((status) => {
            return {
              key: status.statusId,
              name: status.name,
              action: (
                <>
                  <UpdateStatus
                    status={status}
                    onUpdate={refresh}
                  />
                  <DeleteStatus
                    status={status}
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
