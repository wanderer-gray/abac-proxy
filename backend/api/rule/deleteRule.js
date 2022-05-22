module.exports = async function (ruleId, { log, knex, httpErrors }) {
  log.debug(`deleteRule: ruleId=${ruleId}`)

  const numberRulesDeleted = await knex('rule')
    .where({ ruleId })
    .delete()

  if (!numberRulesDeleted) {
    throw httpErrors.notFound('Правило не найдено')
  }
}
