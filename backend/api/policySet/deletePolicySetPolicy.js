module.exports = async (policySetPolicyId, { log, knex, httpErrors }) => {
  log.debug(`deletePolicySetPolicy: policySetPolicyId=${policySetPolicyId}`)

  const numberDeletedPolicySetPolicies = await knex('policySetPolicy')
    .where({ policySetPolicyId })
    .delete()

  if (!numberDeletedPolicySetPolicies) {
    throw httpErrors.notFound('Политика группы не найдена')
  }
}
