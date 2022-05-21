const getTarget = require('./getTarget')

module.exports = async function (targetId, title, code, app) {
  const { log, knex } = app

  log.debug(`createTarget: targetId=${targetId}; title=${title}; code=${code}`)

  await knex('target')
    .insert({
      targetId,
      title,
      code: JSON.stringify(code)
    })

  return getTarget(targetId, app)
}
