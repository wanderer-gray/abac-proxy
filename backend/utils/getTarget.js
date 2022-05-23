module.exports = async (targetId, app) => {
  const { log, knex, httpErrors } = app

  log.debug(`getTarget: targetId=${targetId}`)

  const target = await knex('target')
    .where({ targetId })
    .first([
      'title',
      'source',
      'code'
    ])

  if (!target) {
    log.warn(`getTarget: target not found "${targetId}"`)

    throw httpErrors.notFound('Цель не найдена')
  }

  const {
    title,
    source,
    code
  } = target

  return {
    targetId,
    title,
    source,
    code: JSON.parse(code)
  }
}
