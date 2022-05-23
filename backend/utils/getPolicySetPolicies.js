module.exports = async (policySetId, app) => {
  const { log, knex } = app

  log.debug(`getPolicySetPolicies: policySetId=${policySetId}`)

  const policySetPolicies = await knex('policySetPolicy')
    .where({ policySetId })
    .select([
      'policySetPolicyId',
      'policyId'
    ])

  return policySetPolicies.map((policySetPolicy) => {
    return {
      policySetId,
      ...policySetPolicy
    }
  })
}
