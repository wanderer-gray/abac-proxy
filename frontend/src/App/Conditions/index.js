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
import CreateCondition from './CreateCondition'
import UpdateCondition from './UpdateCondition'
import DeleteCondition from './DeleteCondition'
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

const getCondition = (id) =>
  ConditionAPI.getCondition(id)

const getConditions = (ids) =>
  wait(ids.map(getCondition))

const searchCondition = async (title) => {
  try {
    const ids = await ConditionAPI.searchCondition(title)

    return getConditions(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список условий'
    })
  }

  return []
}

export default function Conditions () {
  const [title, setTitle] = useState('')
  const [conditions, setConditions] = useState([])

  const refresh = useCallback(async () => {
    const conditions = await searchCondition(title)

    setConditions(conditions)
  })

  useEffect(() => { refresh() }, [title])

  return (
    <Container>
      <ContainerHeader
        title={'Условия'}
        create={<CreateCondition onCreate={refresh} />}
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
          conditions.map((condition) => {
            return {
              key: condition.conditionId,
              title: condition.title,
              source: condition.source,
              action: (
                <>
                  <UpdateCondition
                    condition={condition}
                    onUpdate={refresh}
                  />
                  <DeleteCondition
                    condition={condition}
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
