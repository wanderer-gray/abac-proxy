const getPolicySet = require('./getPolicySet')

const fmtPolicySets = (policySetsData, app) =>
  Promise.all(
    policySetsData.map(
      ({ policySetId }) => getPolicySet(policySetId, app)
    )
  )

module.exports = async (app) => {
  const { knex } = app

  const policySetsData = await knex('policySet')
    .select(['policySetId'])

  const formattedPolicySets = await fmtPolicySets(policySetsData, app)

  return formattedPolicySets
}
