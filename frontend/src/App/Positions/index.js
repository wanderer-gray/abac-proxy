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
import CreatePosition from './CreatePosition'
import UpdatePosition from './UpdatePosition'
import DeletePosition from './DeletePosition'
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

const getPosition = (id) =>
  PositionAPI.getPosition(id)

const getPositions = (ids) =>
  wait(ids.map(getPosition))

const searchPositions = async (name) => {
  try {
    const ids = await PositionAPI.searchPositions(name)

    return getPositions(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список должностей'
    })
  }

  return []
}

export default function Positions () {
  const [name, setName] = useState('')
  const [positions, setPositions] = useState([])

  const refresh = useCallback(async () => {
    const positions = await searchPositions(name)

    setPositions(positions)
  })

  useEffect(() => { refresh() }, [name])

  return (
    <Container>
      <ContainerHeader
        title={'Должности'}
        create={<CreatePosition onCreate={refresh} />}
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
          positions.map((position) => {
            return {
              key: position.positionId,
              name: position.name,
              action: (
                <>
                  <UpdatePosition
                    position={position}
                    onUpdate={refresh}
                  />
                  <DeletePosition
                    position={position}
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
