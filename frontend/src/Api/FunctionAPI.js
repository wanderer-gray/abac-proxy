export const FunctionAPI = {
  searchFunction: (namespaceName, functionName) =>
    http('api/function/searchFunction')
      .method('get')
      .query({
        namespaceName,
        functionName
      }),

  getFunction: (namespaceName, functionName) =>
    http('api/function/getFunction')
      .method('get')
      .query({
        namespaceName,
        functionName
      })
}
