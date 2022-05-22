const getPolicies = require('./getPolicies')

module.exports = async (policySetId, policyIds, app) => {
  const { log, knex } = app

  log.debug(`setPolicies: policySetId=${policySetId}; policies=${JSON.stringify(policyIds)}`)

  await knex.transaction(async (trx) => {
    await trx('policies')
      .where({ policySetId })
      .delete()

    const policies = policyIds.map((policyId) => {
      return {
        policySetId,
        policyId
      }
    })

    if (policies.length) {
      await trx('policies')
        .insert(policies)
    }
  })

  return getPolicies(policySetId, app)
}
