module.exports = async (targetId, app) => {
  const { log, knex, httpErrors } = app

  log.debug(`getTarget: targetId=${targetId}`)

  const target = await knex('target')
    .where({ targetId })
    .first([
      'title',
      'code'
    ])

  if (!target) {
    log.warn(`getTarget: target not found "${targetId}"`)

    throw httpErrors.notFound('Цель не найдена')
  }

  const {
    title,
    code
  } = target

  return {
    targetId,
    title,
    code: JSON.parse(code)
  }
}
