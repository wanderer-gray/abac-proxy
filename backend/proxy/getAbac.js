const { ABAC } = require('abac-kernel')
const getNamespace = require('../utils/getNamespace')
const getPolicySets = require('./getPolicySets')

module.exports = async (abacData, app) => {
  try {
    const {
      algorithm,
      namespaceName
    } = abacData

    const namespace = getNamespace(namespaceName, app)
    const policySets = await getPolicySets(app)

    const abac = ABAC.new({
      algorithm,
      namespace
    })

    abac.addPolicySets(policySets)

    return [false, abac]
  } catch {
    return [true]
  }
}
