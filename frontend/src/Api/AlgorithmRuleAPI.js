export const AlgorithmRuleAPI = {
  searchAlgorithmRule: (name) =>
    http('api/algorithmRule/searchAlgorithmRule')
      .method('get')
      .query({ name }),

  getAlgorithmRule: (algorithmRuleId) =>
    http('api/algorithmRule/getAlgorithmRule')
      .method('get')
      .query({ algorithmRuleId })
}
