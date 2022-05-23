const { Parser } = require('abac-kernel')
const getCondition = require('./getCondition')

module.exports = async function (conditionId, conditionData, app) {
  const { log, knex } = app

  log.debug(`updateCondition: conditionId=${conditionId}; conditionData=${JSON.stringify(conditionData)}`)

  const { source } = conditionData

  if (source !== undefined) {
    const code = Parser.Parse(source)

    log.info(`updateCondition: code=${JSON.stringify(code)}`)

    conditionData.code = JSON.stringify(code)
  }

  await knex('condition')
    .where({ conditionId })
    .update(conditionData)

  return getCondition(conditionId, app)
}
