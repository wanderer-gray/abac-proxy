const getCondition = require('./getCondition')
const { parse } = require('../../utils')

module.exports = async function (conditionId, conditionData, app) {
  const { log, knex } = app

  log.debug(`updateCondition: conditionId=${conditionId}; conditionData=${JSON.stringify(conditionData)}`)

  const { source } = conditionData

  if (source !== undefined) {
    const code = parse(source, app)

    conditionData.code = JSON.stringify(code)
  }

  await knex('condition')
    .where({ conditionId })
    .update(conditionData)

  return getCondition(conditionId, app)
}
