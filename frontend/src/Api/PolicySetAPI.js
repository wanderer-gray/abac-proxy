export const PolicySetAPI = {
  searchPolicySet: (title) =>
    http('api/policySet/searchPolicySet')
      .method('get')
      .query({ title }),

  getPolicySet: (policySetId) =>
    http('api/policySet/getPolicySet')
      .method('get')
      .query({ policySetId }),

  createPolicySet: (policySetId, title, targetId, algorithmPolicyId, namespaceName) =>
    http('api/policySet/createPolicySet')
      .method('post')
      .body({
        policySetId,
        title,
        targetId,
        algorithmPolicyId,
        namespaceName
      }),

  updatePolicySet: (policySetId, policySetData) =>
    http('api/policySet/updatePolicySet')
      .method('put')
      .query({ policySetId })
      .body(policySetData),

  deletePolicySet: (policySetId) =>
    http('api/policySet/deletePolicySet')
      .method('delete')
      .query({ policySetId }),

  getPolicies: (policySetId) =>
    http('api/policySet/getPolicies')
      .method('get')
      .query({ policySetId }),

  setPolicies: (policySetId, policies) =>
    http('api/policySet/setPolicies')
      .method('put')
      .query({ policySetId })
      .body(policies)
}
