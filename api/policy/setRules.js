const getRules = require('./getRules')

module.exports = async (policyId, ruleIds, app) => {
  const { log, knex } = app

  log.debug(`setRules: policyId=${policyId}; rules=${JSON.stringify(ruleIds)}`)

  await knex.transaction(async (trx) => {
    await trx('rules')
      .where({ policyId })
      .delete()

    const rules = ruleIds.map((ruleId) => {
      return {
        policyId,
        ruleId
      }
    })

    if (rules.length) {
      await trx('rules')
        .insert(rules)
    }
  })

  return getRules(policyId, app)
}
