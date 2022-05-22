module.exports = async (effectId, app) => {
  const { log, knex, httpErrors } = app

  log.debug(`getEffect: effectId=${effectId}`)

  const effect = await knex('effect')
    .where({ effectId })
    .first(['name'])

  if (!effect) {
    log.warn(`getEffect: effect not found "${effectId}"`)

    throw httpErrors.notFound('Эффект не найден')
  }

  const { name } = effect

  return {
    effectId,
    name
  }
}
