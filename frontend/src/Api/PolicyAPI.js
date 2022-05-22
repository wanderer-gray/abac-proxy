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

  getRules: (policyId) =>
    http('api/policy/getRules')
      .method('get')
      .query({ policyId }),

  setRules: (policyId, rules) =>
    http('api/policy/setRules')
      .method('put')
      .query({ policyId })
      .body(rules)
}
