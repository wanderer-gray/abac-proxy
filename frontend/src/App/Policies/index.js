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
  SearchField,
  Effect
} from '../component'
import CreateRule from './CreateRule'
import UpdatePolicy from './UpdateRule'
import DeletePolicy from './DeleteRule'
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
        name: 'effect',
        title: 'Эффект',
        convert: (effect) =>
          <Effect effect={effect} />
      },
      {
        name: 'target',
        path: ['target', 'title'],
        title: 'Цель'
      },
      {
        name: 'condition',
        path: ['condition', 'title'],
        title: 'Условие'
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

const getEffect = (id) =>
  EffectAPI.getEffect(id)

const getTarget = (id) =>
  TargetAPI.getTarget(id)

const getCondition = (id) =>
  ConditionAPI.getCondition(id)

const getNamespace = (name) =>
  NamespaceAPI.getNamespace(name)

const getRule = async (id) => {
  const {
    ruleId,
    title,
    effectId,
    targetId,
    conditionId,
    namespaceName
  } = await RuleAPI.getRule(id)

  const [
    effect,
    target,
    condition,
    namespace
  ] = await Promise.all([
    getEffect(effectId),
    getTarget(targetId),
    getCondition(conditionId),
    getNamespace(namespaceName)
  ])

  return {
    ruleId,
    title,
    effect,
    target,
    condition,
    namespace
  }
}

const getRules = (ids) =>
  wait(ids.map(getRule))

const searchPolicy = async (title) => {
  try {
    const ids = await RuleAPI.searchRule(title)

    return getRules(ids)
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
        create={<CreateRule onCreate={refresh} />}
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
