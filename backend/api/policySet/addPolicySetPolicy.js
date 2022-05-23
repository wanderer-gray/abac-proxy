module.exports = async (policySetPolicyId, policySetId, policyId, { log, knex }) => {
  log.debug(`addPolicySetPolicy: policySetPolicyId=${policySetPolicyId}; policySetId=${policySetId}; policyId=${policyId}`)

  await knex('policySetPolicy')
    .insert({
      policySetPolicyId,
      policySetId,
      policyId
    })
}
