const getNamespaces = require('./getNamespaces')
const getNamespace = require('./getNamespace')
const assertNamespaceName = require('./assertNamespaceName')
const getAttributes = require('./getAttributes')
const getAttribute = require('./getAttribute')
const getFunctions = require('./getFunctions')
const getFunction = require('./getFunction')
const getTarget = require('./getTarget')
const getCondition = require('./getCondition')
const getEffect = require('./getEffect')
const getRule = require('./getRule')
const getAlgorithmRule = require('./getAlgorithmRule')
const getPolicy = require('./getPolicy')
const getPolicyRules = require('./getPolicyRules')
const getAlgorithmPolicy = require('./getAlgorithmPolicy')
const getPolicySet = require('./getPolicySet')
const getPolicySetPolicies = require('./getPolicySetPolicies')
const parse = require('./parse')

module.exports = {
  getNamespaces,
  getNamespace,
  assertNamespaceName,
  getAttributes,
  getAttribute,
  getFunctions,
  getFunction,
  getTarget,
  getCondition,
  getEffect,
  getRule,
  getAlgorithmRule,
  getPolicy,
  getPolicyRules,
  getAlgorithmPolicy,
  getPolicySet,
  getPolicySetPolicies,
  parse
}
