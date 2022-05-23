const { Parser } = require('abac-kernel')
const getTarget = require('./getTarget')

module.exports = async function (targetId, title, source, app) {
  const { log, knex } = app

  log.debug(`createTarget: targetId=${targetId}; title=${title}; source=${source}`)

  const code = Parser.Parse(source)

  log.info(`createTarget: code=${JSON.stringify(code)}`)

  await knex('target')
    .insert({
      targetId,
      title,
      code: JSON.stringify(code)
    })

  return getTarget(targetId, app)
}
