const getTarget = require('./getTarget')

module.exports = async function (targetId, targetData, app) {
  const { log, knex } = app

  log.debug(`updateTarget: targetId=${targetId}; targetData=${JSON.stringify(targetData)}`)

  const { code } = targetData

  if (code !== undefined) {
    targetData.code = JSON.stringify(code)
  }

  await knex('target')
    .where({ targetId })
    .update(targetData)

  return getTarget(targetId, app)
}
