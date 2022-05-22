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
import CreateTask from './CreateTask'
import UpdateTask from './UpdateTask'
import DeleteTask from './DeleteTask'
import Members from './Members'
import {
  fmtDateTime,
  wait
} from '../utils'

const columns = [
  {
    name: 'collapse'
  },
  {
    name: 'title',
    title: 'Заголовок'
  },
  {
    name: 'status',
    path: ['status', 'name'],
    title: 'Статус'
  },
  {
    name: 'createdAt',
    title: 'Дата создания'
  },
  {
    name: 'action',
    align: 'right'
  }
]

const getStatus = (id) =>
  StatusAPI.getStatus(id)

const getTask = async (id) => {
  const task = await TaskAPI.getTask(id)

  const {
    taskId,
    title,
    createdAt,
    statusId
  } = task

  const status = await getStatus(statusId)

  return {
    taskId,
    title,
    createdAt: fmtDateTime(createdAt),
    status
  }
}

const getTasks = (ids) =>
  wait(ids.map(getTask))

const searchTasks = async (title) => {
  try {
    const ids = await TaskAPI.searchTasks(title)

    return getTasks(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список задач'
    })
  }

  return []
}

export default function Tasks () {
  const [title, setTitle] = useState('')
  const [tasks, setTasks] = useState([])

  const refresh = useCallback(async () => {
    const tasks = await searchTasks(title)

    setTasks(tasks)
  })

  useEffect(() => { refresh() }, [title])

  return (
    <Container>
      <ContainerHeader
        title={'Задачи'}
        create={<CreateTask onCreate={refresh} />}
      />

      <ContainerSearch>
        <SearchField
          label={'Заголовок'}
          placeholder={'Введите заголовок...'}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </ContainerSearch>

      <ContainerTable
        columns={columns}
        rows={
          tasks.map((task) => {
            const { taskId } = task

            return {
              key: taskId,
              title: task.title,
              createdAt: task.createdAt,
              status: task.status,
              action: (
                <>
                  <UpdateTask
                    task={task}
                    onUpdate={refresh}
                  />
                  <DeleteTask
                    task={task}
                    onDelete={refresh}
                  />
                </>
              ),
              collapse: <Members taskId={taskId} />
            }
          })
        }
      />
    </Container>
  )
}
