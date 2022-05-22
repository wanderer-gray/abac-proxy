import { Component } from 'react'
import PropTypes from 'prop-types'
import { AuthAPI } from './AuthAPI'
import { NamespaceAPI } from './NamespaceAPI'
import { AttributeAPI } from './AttributeAPI'
import { FunctionAPI } from './FunctionAPI'
import { TargetAPI } from './TargetAPI'
import { ConditionAPI } from './ConditionAPI'
import { EffectAPI } from './EffectAPI'
import { RuleAPI } from './RuleAPI'
import { AlgorithmRuleAPI } from './AlgorithmRuleAPI'
import { PolicyAPI } from './PolicyAPI'
import { AlgorithmPolicyAPI } from './AlgorithmPolicyAPI'
import { PolicySetAPI } from './PolicySetAPI'

export default class Api extends Component {
  constructor (props) {
    super(props)

    window.AuthAPI = AuthAPI
    window.NamespaceAPI = NamespaceAPI
    window.AttributeAPI = AttributeAPI
    window.FunctionAPI = FunctionAPI
    window.TargetAPI = TargetAPI
    window.ConditionAPI = ConditionAPI
    window.EffectAPI = EffectAPI
    window.RuleAPI = RuleAPI
    window.AlgorithmRuleAPI = AlgorithmRuleAPI
    window.PolicyAPI = PolicyAPI
    window.AlgorithmPolicyAPI = AlgorithmPolicyAPI
    window.PolicySetAPI = PolicySetAPI
  }

  render () {
    return this.props.children
  }
}

Api.propTypes = {
  children: PropTypes.node
}
