const getTarget = require('./getTarget')
const { parse } = require('../../utils')

module.exports = async function (targetId, targetData, app) {
  const { log, knex } = app

  log.debug(`updateTarget: targetId=${targetId}; targetData=${JSON.stringify(targetData)}`)

  const { source } = targetData

  if (source !== undefined) {
    const code = parse(source, app)

    targetData.code = JSON.stringify(code)
  }

  await knex('target')
    .where({ targetId })
    .update(targetData)

  return getTarget(targetId, app)
}
