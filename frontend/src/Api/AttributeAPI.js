export const AttributeAPI = {
  searchAttribute: (namespaceName, attributeName) =>
    http('api/attribute/searchAttribute')
      .method('get')
      .query({
        namespaceName,
        attributeName
      }),

  getAttribute: (namespaceName, attributeName) =>
    http('api/attribute/getAttribute')
      .method('get')
      .query({
        namespaceName,
        attributeName
      })
}
