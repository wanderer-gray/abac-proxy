module.exports = async (policyId, app) => {
  const { log, knex } = app

  log.debug(`getPolicyRules: policyId=${policyId}`)

  const policyRules = await knex('policyRule')
    .where({ policyId })
    .select([
      'policyRuleId',
      'ruleId'
    ])

  return policyRules.map((policyRule) => {
    return {
      policyId,
      ...policyRule
    }
  })
}
