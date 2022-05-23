export const EffectAPI = {
  searchEffect: (name) =>
    http('api/effect/searchEffect')
      .method('get')
      .query({ name }),

  getEffect: (effectId) =>
    http('api/effect/getEffect')
      .method('get')
      .query({ effectId })
}
