const getCondition = require('./getCondition')

module.exports = async function (conditionId, title, code, app) {
  const { log, knex } = app

  log.debug(`createCondition: conditionId=${conditionId}; title=${title}; code=${code}`)

  await knex('condition')
    .insert({
      conditionId,
      title,
      code: JSON.stringify(code)
    })

  return getCondition(conditionId, app)
}
