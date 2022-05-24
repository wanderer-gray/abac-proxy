const getPolicySet = require('./getPolicySet')
const { assertNamespaceName } = require('../../utils')

module.exports = async function (policySetId, title, targetId, algorithmPolicyId, namespaceName, app) {
  const { log, knex } = app

  log.debug(`createPolicySet: policySetId=${policySetId}; title=${title}; targetId=${targetId}; algorithmPolicyId=${algorithmPolicyId}; namespaceName=${namespaceName}`)

  assertNamespaceName(namespaceName, app)

  await knex('policySet')
    .insert({
      policySetId,
      title,
      targetId,
      algorithmPolicyId,
      namespaceName
    })

  return getPolicySet(policySetId, app)
}
