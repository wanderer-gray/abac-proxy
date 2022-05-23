module.exports = async (policyRuleId, { log, knex, httpErrors }) => {
  log.debug(`deletePolicyRule: policyRuleId=${policyRuleId}`)

  const numberDeletedPolicyRules = await knex('policyRule')
    .where({ policyRuleId })
    .delete()

  if (!numberDeletedPolicyRules) {
    throw httpErrors.notFound('Правило политики не найдено')
  }
}
