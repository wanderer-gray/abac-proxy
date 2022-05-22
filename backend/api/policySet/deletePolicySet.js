module.exports = async function (policySetId, { log, knex, httpErrors }) {
  log.debug(`deletePolicySet: policySetId=${policySetId}`)

  const numberPolicySetsDeleted = await knex('policySet')
    .where({ policySetId })
    .delete()

  if (!numberPolicySetsDeleted) {
    throw httpErrors.notFound('Группы политик не найдена')
  }
}
