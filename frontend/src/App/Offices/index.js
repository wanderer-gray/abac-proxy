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
import CreateOffice from './CreateOffice'
import UpdateOffice from './UpdateOffice'
import DeleteOffice from './DeleteOffice'
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

const getOffice = (id) =>
  OfficeAPI.getOffice(id)

const getOffices = (ids) =>
  wait(ids.map(getOffice))

const searchOffices = async (name) => {
  try {
    const ids = await OfficeAPI.searchOffices(name)

    return getOffices(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список офисов'
    })
  }

  return []
}

export default function Offices () {
  const [name, setName] = useState('')
  const [offices, setOffices] = useState([])

  const refresh = useCallback(async () => {
    const offices = await searchOffices(name)

    setOffices(offices)
  })

  useEffect(() => { refresh() }, [name])

  return (
    <Container>
      <ContainerHeader
        title={'Офисы'}
        create={<CreateOffice onCreate={refresh} />}
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
          offices.map((office) => {
            return {
              key: office.officeId,
              name: office.name,
              action: (
                <>
                  <UpdateOffice
                    office={office}
                    onUpdate={refresh}
                  />
                  <DeleteOffice
                    office={office}
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
