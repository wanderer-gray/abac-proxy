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
import CreatePolicySet from './CreatePolicySet'
import UpdatePolicySet from './UpdatePolicySet'
import DeletePolicySet from './DeletePolicySet'
import Policies from './Policies'
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
        name: 'algorithmPolicy',
        path: ['algorithmPolicy', 'name'],
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
  },
  {
    collapse: true,
    name: 'policies',
    title: 'Политики',
    convert: ({ policySetId }) =>
      <Policies policySetId={policySetId} />
  }
]

const getTarget = (id) =>
  TargetAPI.getTarget(id)

const getAlgorithmPolicy = (id) =>
  AlgorithmPolicyAPI.getAlgorithmPolicy(id)

const getNamespace = (name) =>
  NamespaceAPI.getNamespace(name)

const getPolicySet = async (id) => {
  const {
    policySetId,
    title,
    targetId,
    algorithmPolicyId,
    namespaceName
  } = await PolicySetAPI.getPolicySet(id)

  const [
    target,
    algorithmPolicy,
    namespace
  ] = await Promise.all([
    getTarget(targetId),
    getAlgorithmPolicy(algorithmPolicyId),
    namespaceName ? getNamespace(namespaceName) : null
  ])

  return {
    policySetId,
    title,
    target,
    algorithmPolicy,
    namespace
  }
}

const getPolicySets = (ids) =>
  wait(ids.map(getPolicySet))

const searchPolicySet = async (title) => {
  try {
    const ids = await PolicySetAPI.searchPolicySet(title)

    return getPolicySets(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список групп политик'
    })
  }

  return []
}

export default function PolicySets () {
  const [title, setTitle] = useState('')
  const [policySets, setPolicySets] = useState([])

  const refresh = useCallback(async () => {
    const policySets = await searchPolicySet(title)

    setPolicySets(policySets)
  })

  useEffect(() => { refresh() }, [title])

  return (
    <Container>
      <ContainerHeader
        title={'Группы политик'}
        create={<CreatePolicySet onCreate={refresh} />}
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
          policySets.map((policySet) => {
            const { policySetId } = policySet

            return {
              key: policySetId,
              policySetId,
              title: policySet.title,
              target: policySet.target,
              algorithmPolicy: policySet.algorithmPolicy,
              namespace: policySet.namespace,
              action: (
                <>
                  <UpdatePolicySet
                    policySet={policySet}
                    onUpdate={refresh}
                  />
                  <DeletePolicySet
                    policySet={policySet}
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
