import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  ContainerHeader,
  ContainerTable
} from '../../component'
import CreatePolicySetPolicy from './CreatePolicySetPolicy'
import DeletePolicySetPolicy from './DeletePolicySetPolicy'
import { wait } from '../../utils'

const columns = [
  {
    sx: {
      width: '20%'
    },
    name: 'policy',
    path: ['policy', 'title'],
    title: 'Политика'
  },
  {
    vertical: true,
    name: 'settings',
    title: 'Настройки',
    columns: [
      {
        name: 'target',
        path: ['policy', 'target', 'title'],
        title: 'Цель'
      },
      {
        name: 'algorithmRule',
        path: ['policy', 'algorithmRule', 'name'],
        title: 'Алгоритм'
      },
      {
        name: 'namespace',
        path: ['policy', 'namespace', 'name'],
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
    namespaceName ? getNamespace(namespaceName) : null
  ])

  return {
    policyId,
    title,
    target,
    algorithmRule,
    namespace
  }
}

const getPolicySetPolicy = async ({ policySetPolicyId, policyId }) => {
  const policy = await getPolicy(policyId)

  return {
    policySetPolicyId,
    policy
  }
}

const getPolicySetPolicies = async (policySetId) => {
  try {
    const policySetPolicies = await PolicySetAPI.getPolicySetPolicies(policySetId)

    return wait(policySetPolicies.map(getPolicySetPolicy))
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список политик группы'
    })
  }

  return []
}

export default function Policies ({ policySetId }) {
  const [policySetPolicies, setPolicySetPolicies] = useState([])

  const refresh = useCallback(async () => {
    const policySetPolicies = await getPolicySetPolicies(policySetId)

    setPolicySetPolicies(policySetPolicies)
  })

  useEffect(() => { refresh() }, [])

  return (
    <Container>
      <ContainerHeader
        title={'Политики'}
        create={(
          <CreatePolicySetPolicy
            policySetId={policySetId}
            onCreate={refresh}
          />
        )}
      />

      <ContainerTable
        columns={columns}
        rows={
          policySetPolicies.map((policySetPolicy) => {
            return {
              key: policySetPolicy.policySetPolicyId,
              policy: policySetPolicy.policy,
              action: (
                <DeletePolicySetPolicy
                  policySetPolicy={policySetPolicy}
                  onDelete={refresh}
                />
              )
            }
          })
        }
      />
    </Container>
  )
}

Policies.propTypes = {
  policySetId: PropTypes.string
}
