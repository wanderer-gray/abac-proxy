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

  getPolicySetPolicies: (policySetId) =>
    http('api/policySet/getPolicySetPolicies')
      .method('get')
      .query({ policySetId }),

  addPolicySetPolicy: (policySetPolicyId, policySetId, policyId) =>
    http('api/policySet/addPolicySetPolicy')
      .method('post')
      .body({
        policySetPolicyId,
        policySetId,
        policyId
      }),

  deletePolicySetPolicy: (policySetPolicyId) =>
    http('api/policySet/deletePolicySetPolicy')
      .method('delete')
      .query({ policySetPolicyId })
}
