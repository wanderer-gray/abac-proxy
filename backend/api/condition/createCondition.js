const { Parser } = require('abac-kernel')
const getCondition = require('./getCondition')

module.exports = async function (conditionId, title, source, app) {
  const { log, knex } = app

  log.debug(`createCondition: conditionId=${conditionId}; title=${title}; source=${source}`)

  const code = Parser.Parse(source)

  log.info(`createCondition: code=${JSON.stringify(code)}`)

  await knex('condition')
    .insert({
      conditionId,
      title,
      code: JSON.stringify(code)
    })

  return getCondition(conditionId, app)
}
