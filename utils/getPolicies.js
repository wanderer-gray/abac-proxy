module.exports = (policySetId, app) => {
  const { log, knex } = app

  log.debug(`getPolicies: policySetId=${policySetId}`)

  return knex('policies')
    .where({ policySetId })
    .pluck('policyId')
}
