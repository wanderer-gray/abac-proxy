const getCondition = require('./getCondition')
const { parse } = require('../../utils')

module.exports = async function (conditionId, title, source, app) {
  const { log, knex } = app

  log.debug(`createCondition: conditionId=${conditionId}; title=${title}; source=${source}`)

  const code = parse(source, app)

  await knex('condition')
    .insert({
      conditionId,
      title,
      source,
      code: JSON.stringify(code)
    })

  return getCondition(conditionId, app)
}
