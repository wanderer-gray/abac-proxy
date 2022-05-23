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
} from '../component'
import CreatePolicyRule from './CreatePolicyRule'
import DeletePolicyRule from './DeletePolicyRule'
import { wait } from '../utils'

const columns = [
  {
    name: 'rule',
    path: ['rule', 'title'],
    title: 'Название'
  },
  {
    name: 'action',
    align: 'right'
  }
]

const getRule = (id) =>
  RuleAPI.getRule(id)

const getPolicyRule = async ({ policyRuleId, ruleId }) => {
  const [rule] = await getRule(ruleId)

  return {
    policyRuleId,
    rule
  }
}

const getPolicyRules = async (title) => {
  try {
    const policyRules = await PolicyAPI.getPolicyRules(title)

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
              title: policyRule.rule,
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
