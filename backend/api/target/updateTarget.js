const { Parser } = require('abac-kernel')
const getTarget = require('./getTarget')

module.exports = async function (targetId, targetData, app) {
  const { log, knex } = app

  log.debug(`updateTarget: targetId=${targetId}; targetData=${JSON.stringify(targetData)}`)

  const { source } = targetData

  if (source !== undefined) {
    const code = Parser.Parse(source)

    log.info(`updateTarget: code=${JSON.stringify(code)}`)

    targetData.code = JSON.stringify(code)
  }

  await knex('target')
    .where({ targetId })
    .update(targetData)

  return getTarget(targetId, app)
}
