import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  ContainerHeader,
  ContainerTable,
  Effect
} from '../../component'
import CreatePolicyRule from './CreatePolicyRule'
import DeletePolicyRule from './DeletePolicyRule'
import { wait } from '../../utils'

const columns = [
  {
    sx: {
      width: '20%'
    },
    name: 'rule',
    path: ['rule', 'title'],
    title: 'Правило'
  },
  {
    vertical: true,
    name: 'settings',
    title: 'Настройки',
    columns: [
      {
        name: 'effect',
        path: ['rule', 'effect'],
        title: 'Эффект',
        convert: (effect) =>
          <Effect effect={effect} />
      },
      {
        name: 'target',
        path: ['rule', 'target', 'title'],
        title: 'Цель'
      },
      {
        name: 'condition',
        path: ['rule', 'condition', 'title'],
        title: 'Условие'
      },
      {
        name: 'namespace',
        path: ['rule', 'namespace', 'name'],
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
    targetId ? getTarget(targetId) : null,
    getCondition(conditionId),
    namespaceName ? getNamespace(namespaceName) : null
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

const getPolicyRule = async ({ policyRuleId, ruleId }) => {
  const rule = await getRule(ruleId)

  return {
    policyRuleId,
    rule
  }
}

const getPolicyRules = async (policyId) => {
  try {
    const policyRules = await PolicyAPI.getPolicyRules(policyId)

    return wait(policyRules.map(getPolicyRule))
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список правил политики'
    })
  }

  return []
}

export default function Rules ({ policyId }) {
  const [policyRules, setPolicyRules] = useState([])

  const refresh = useCallback(async () => {
    const policyRules = await getPolicyRules(policyId)

    setPolicyRules(policyRules)
  })

  useEffect(() => { refresh() }, [])

  return (
    <Container>
      <ContainerHeader
        title={'Правила'}
        create={(
          <CreatePolicyRule
            policyId={policyId}
            onCreate={refresh}
          />
        )}
      />

      <ContainerTable
        columns={columns}
        rows={
          policyRules.map((policyRule) => {
            return {
              key: policyRule.policyRuleId,
              rule: policyRule.rule,
              action: (
                <DeletePolicyRule
                  policyRule={policyRule}
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

Rules.propTypes = {
  policyId: PropTypes.string
}
