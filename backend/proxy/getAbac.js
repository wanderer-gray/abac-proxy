const { ABAC } = require('abac-kernel')
const getNamespace = require('../utils/getNamespace')
const getPolicySets = require('./getPolicySets')

const fmtAbac = (abacData, app) => {
  const {
    namespaceName
  } = abacData

  const namespace = getNamespace(namespaceName, app)

  return {
    ...abacData,
    namespace
  }
}

module.exports = async (abacData, app) => {
  const [
    formattedAbac,
    policySets
  ] = await Promise.all([
    fmtAbac(abacData, app),
    getPolicySets(app)
  ])

  const abac = ABAC.new(formattedAbac)

  abac.addPolicySets(policySets)

  return abac
}
