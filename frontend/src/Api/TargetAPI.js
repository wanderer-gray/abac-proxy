export const TargetAPI = {
  searchTarget: (title) =>
    http('api/target/searchTarget')
      .method('get')
      .query({ title }),

  getTarget: (targetId) =>
    http('api/target/getTarget')
      .method('get')
      .query({ targetId }),

  createTarget: (targetId, title, source) =>
    http('api/target/createTarget')
      .method('post')
      .body({
        targetId,
        title,
        source
      }),

  updateTarget: (targetId, targetData) =>
    http('api/target/updateTarget')
      .method('put')
      .query({ targetId })
      .body(targetData),

  deleteTarget: (targetId) =>
    http('api/target/deleteTarget')
      .method('delete')
      .query({ targetId })
}
