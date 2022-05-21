module.exports = async (conditionId, app) => {
  const { log, knex, httpErrors } = app

  log.debug(`getCondition: conditionId=${conditionId}`)

  const condition = await knex('condition')
    .where({ conditionId })
    .first([
      'title',
      'code'
    ])

  if (!condition) {
    log.warn(`getCondition: condition not found "${conditionId}"`)

    throw httpErrors.notFound('Условие не найдено')
  }

  const {
    title,
    code
  } = condition

  return {
    conditionId,
    title,
    code: JSON.parse(code)
  }
}
