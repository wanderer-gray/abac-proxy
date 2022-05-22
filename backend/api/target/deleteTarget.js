module.exports = async function (targetId, { log, knex, httpErrors }) {
  log.debug(`deleteTarget: targetId=${targetId}`)

  const numberTargetsDeleted = await knex('target')
    .where({ targetId })
    .delete()

  if (!numberTargetsDeleted) {
    throw httpErrors.notFound('Цель не найдена')
  }
}
