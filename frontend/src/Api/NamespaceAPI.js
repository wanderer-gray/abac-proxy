export const NamespaceAPI = {
  searchNamespace: (namespaceName) =>
    http('api/namespace/searchNamespace')
      .method('get')
      .query({ namespaceName }),

  getNamespace: (namespaceName) =>
    http('api/namespace/getNamespace')
      .method('get')
      .query({ namespaceName })
}
