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
import CreateTarget from './CreateTarget'
import UpdateTarget from './UpdateTarget'
import DeleteTarget from './DeleteTarget'
import { wait } from '../utils'

const columns = [
  {
    sx: {
      width: '20%'
    },
    name: 'title',
    title: 'Название'
  },
  {
    name: 'source',
    title: 'Исходный код'
  },
  {
    name: 'action',
    align: 'right'
  }
]

const getTarget = (id) =>
  TargetAPI.getTarget(id)

const getTargets = (ids) =>
  wait(ids.map(getTarget))

const searchTarget = async (title) => {
  try {
    const ids = await TargetAPI.searchTarget(title)

    return getTargets(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список целей'
    })
  }

  return []
}

export default function Targets () {
  const [title, setTitle] = useState('')
  const [targets, setTargets] = useState([])

  const refresh = useCallback(async () => {
    const targets = await searchTarget(title)

    setTargets(targets)
  })

  useEffect(() => { refresh() }, [title])

  return (
    <Container>
      <ContainerHeader
        title={'Цели'}
        create={<CreateTarget onCreate={refresh} />}
      />

      <ContainerSearch>
        <SearchField
          label={'Название'}
          placeholder={'Введите название...'}
          value={title}
          onChangeValue={setTitle}
        />
      </ContainerSearch>

      <ContainerTable
        columns={columns}
        rows={
          targets.map((target) => {
            return {
              key: target.targetId,
              title: target.title,
              source: target.source,
              action: (
                <>
                  <UpdateTarget
                    target={target}
                    onUpdate={refresh}
                  />
                  <DeleteTarget
                    target={target}
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
