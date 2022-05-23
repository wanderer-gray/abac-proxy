export const ConditionAPI = {
  searchCondition: (title) =>
    http('api/condition/searchCondition')
      .method('get')
      .query({ title }),

  getCondition: (conditionId) =>
    http('api/condition/getCondition')
      .method('get')
      .query({ conditionId }),

  createCondition: (conditionId, title, source) =>
    http('api/condition/createCondition')
      .method('post')
      .body({
        conditionId,
        title,
        source
      }),

  updateCondition: (conditionId, conditionData) =>
    http('api/condition/updateCondition')
      .method('put')
      .query({ conditionId })
      .body(conditionData),

  deleteCondition: (conditionId) =>
    http('api/condition/deleteCondition')
      .method('delete')
      .query({ conditionId })
}
