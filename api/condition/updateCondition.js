const getCondition = require('./getCondition')

module.exports = async function (conditionId, conditionData, app) {
  const { log, knex } = app

  log.debug(`updateCondition: conditionId=${conditionId}; conditionData=${JSON.stringify(conditionData)}`)

  const { code } = conditionData

  if (code !== undefined) {
    conditionData.code = JSON.stringify(code)
  }

  await knex('condition')
    .where({ conditionId })
    .update(conditionData)

  return getCondition(conditionId, app)
}
