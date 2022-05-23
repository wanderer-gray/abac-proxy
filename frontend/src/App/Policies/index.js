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
import CreatePolicy from './CreatePolicy'
import UpdatePolicy from './UpdatePolicy'
import DeletePolicy from './DeletePolicy'
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
    vertical: true,
    name: 'settings',
    title: 'Настройки',
    columns: [
      {
        name: 'target',
        path: ['target', 'title'],
        title: 'Цель'
      },
      {
        name: 'algorithmRule',
        path: ['algorithmRule', 'name'],
        title: 'Алгоритм'
      },
      {
        name: 'namespace',
        path: ['namespace', 'name'],
        title: 'Пространство имен'
      }
    ]
  },
  {
    name: 'action',
    align: 'right'
  }
]

const getTarget = (id) =>
  TargetAPI.getTarget(id)

const getAlgorithmRule = (id) =>
  AlgorithmRuleAPI.getAlgorithmRule(id)

const getNamespace = (name) =>
  NamespaceAPI.getNamespace(name)

const getPolicy = async (id) => {
  const {
    policyId,
    title,
    targetId,
    algorithmRuleId,
    namespaceName
  } = await PolicyAPI.getPolicy(id)

  const [
    target,
    algorithmRule,
    namespace
  ] = await Promise.all([
    getTarget(targetId),
    getAlgorithmRule(algorithmRuleId),
    getNamespace(namespaceName)
  ])

  return {
    policyId,
    title,
    target,
    algorithmRule,
    namespace
  }
}

const getPolicies = (ids) =>
  wait(ids.map(getPolicy))

const searchPolicy = async (title) => {
  try {
    const ids = await PolicyAPI.searchPolicy(title)

    return getPolicies(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список правил'
    })
  }

  return []
}

export default function Policies () {
  const [title, setTitle] = useState('')
  const [policies, setPolicies] = useState([])

  const refresh = useCallback(async () => {
    const policies = await searchPolicy(title)

    setPolicies(policies)
  })

  useEffect(() => { refresh() }, [title])

  return (
    <Container>
      <ContainerHeader
        title={'Политики'}
        create={<CreatePolicy onCreate={refresh} />}
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
          policies.map((policy) => {
            return {
              key: policy.policyId,
              title: policy.title,
              target: policy.target,
              algorithmRule: policy.algorithmRule,
              namespace: policy.namespace,
              action: (
                <>
                  <UpdatePolicy
                    policy={policy}
                    onUpdate={refresh}
                  />
                  <DeletePolicy
                    policy={policy}
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
