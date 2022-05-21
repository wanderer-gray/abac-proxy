module.exports = async function (conditionId, { log, knex, httpErrors }) {
  log.debug(`deleteCondition: conditionId=${conditionId}`)

  const numberСonditionsDeleted = await knex('condition')
    .where({ conditionId })
    .delete()

  if (!numberСonditionsDeleted) {
    throw httpErrors.notFound('Условие не найдено')
  }
}
