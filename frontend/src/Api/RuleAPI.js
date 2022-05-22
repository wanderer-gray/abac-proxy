export const RuleAPI = {
  searchRule: (title) =>
    http('api/rule/searchRule')
      .method('get')
      .query({ title }),

  getRule: (ruleId) =>
    http('api/rule/getRule')
      .method('get')
      .query({ ruleId }),

  createRule: (ruleId, title, effectId, targetId, conditionId, namespaceName) =>
    http('api/rule/createRule')
      .method('post')
      .body({
        ruleId,
        title,
        effectId,
        targetId,
        conditionId,
        namespaceName
      }),

  updateRule: (ruleId, ruleData) =>
    http('api/rule/updateRule')
      .method('put')
      .query({ ruleId })
      .body(ruleData),

  deleteRule: (ruleId) =>
    http('api/rule/deleteRule')
      .method('delete')
      .query({ ruleId })
}
