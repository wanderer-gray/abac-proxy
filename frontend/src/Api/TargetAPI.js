export const TargetAPI = {
  searchTarget: (title) =>
    http('api/target/searchFunction')
      .method('get')
      .query({ title }),

  getTarget: (targetId) =>
    http('api/target/getTarget')
      .method('get')
      .query({ targetId }),

  createTarget: (targetId, title, code) =>
    http('api/target/createTarget')
      .method('post')
      .body({
        targetId,
        title,
        code
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
