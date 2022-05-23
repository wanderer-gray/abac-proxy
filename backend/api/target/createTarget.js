const getTarget = require('./getTarget')
const { parse } = require('../../utils')

module.exports = async function (targetId, title, source, app) {
  const { log, knex } = app

  log.debug(`createTarget: targetId=${targetId}; title=${title}; source=${source}`)

  const code = parse(source, app)

  await knex('target')
    .insert({
      targetId,
      title,
      source,
      code: JSON.stringify(code)
    })

  return getTarget(targetId, app)
}
