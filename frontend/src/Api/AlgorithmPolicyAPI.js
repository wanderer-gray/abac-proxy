export const AlgorithmPolicyAPI = {
  searchAlgorithmPolicy: (name) =>
    http('api/algorithmPolicy/searchAlgorithmPolicy')
      .method('get')
      .query({ name }),

  getAlgorithmPolicy: (algorithmPolicyId) =>
    http('api/algorithmPolicy/getAlgorithmPolicy')
      .method('get')
      .query({ algorithmPolicyId })
}
