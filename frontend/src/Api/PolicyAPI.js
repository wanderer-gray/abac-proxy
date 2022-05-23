export const PolicyAPI = {
  searchPolicy: (title) =>
    http('api/policy/searchPolicy')
      .method('get')
      .query({ title }),

  getPolicy: (policyId) =>
    http('api/policy/getPolicy')
      .method('get')
      .query({ policyId }),

  createPolicy: (policyId, title, targetId, algorithmRuleId, namespaceName) =>
    http('api/policy/createPolicy')
      .method('post')
      .body({
        policyId,
        title,
        targetId,
        algorithmRuleId,
        namespaceName
      }),

  updatePolicy: (policyId, policyData) =>
    http('api/policy/updatePolicy')
      .method('put')
      .query({ policyId })
      .body(policyData),

  deletePolicy: (policyId) =>
    http('api/policy/deletePolicy')
      .method('delete')
      .query({ policyId }),

  getPolicyRules: (policyId) =>
    http('api/policy/getPolicyRules')
      .method('get')
      .query({ policyId }),

  addPolicyRule: (policyRuleId, policyId, ruleId) =>
    http('api/policy/addPolicyRule')
      .method('post')
      .body({
        policyRuleId,
        policyId,
        ruleId
      }),

  deletePolicyRule: (policyRuleId) =>
    http('api/policy/deletePolicyRule')
      .method('delete')
      .query({ policyRuleId })
}
