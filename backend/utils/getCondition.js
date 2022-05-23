module.exports = async (conditionId, app) => {
  const { log, knex, httpErrors } = app

  log.debug(`getCondition: conditionId=${conditionId}`)

  const condition = await knex('condition')
    .where({ conditionId })
    .first([
      'title',
      'source',
      'code'
    ])

  if (!condition) {
    log.warn(`getCondition: condition not found "${conditionId}"`)

    throw httpErrors.notFound('Условие не найдено')
  }

  const {
    title,
    source,
    code
  } = condition

  return {
    conditionId,
    title,
    source,
    code: JSON.parse(code)
  }
}
