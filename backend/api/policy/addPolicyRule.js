module.exports = async (policyRuleId, policyId, ruleId, { log, knex }) => {
  log.debug(`addPolicyRule: policyRuleId=${policyRuleId}; policyId=${policyId}; ruleId=${ruleId}`)

  await knex('policyRule')
    .insert({
      policyRuleId,
      policyId,
      ruleId
    })
}
