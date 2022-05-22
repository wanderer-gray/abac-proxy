const { getAlgorithmPolicy } = require('../utils')

module.exports = async (algorithmPolicyId, app) => {
  const algorithmPolicy = await getAlgorithmPolicy(algorithmPolicyId, app)

  return algorithmPolicy.name
}
