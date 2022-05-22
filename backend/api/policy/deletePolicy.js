module.exports = async function (policyId, { log, knex, httpErrors }) {
  log.debug(`deletePolicy: policyId=${policyId}`)

  const numberPoliciesDeleted = await knex('policy')
    .where({ policyId })
    .delete()

  if (!numberPoliciesDeleted) {
    throw httpErrors.notFound('Политика не найдена')
  }
}
