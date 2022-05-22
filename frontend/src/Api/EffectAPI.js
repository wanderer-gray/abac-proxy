export const EffectAPI = {
  searchEffect: (name) =>
    http('api/effect/searchEffect')
      .method('get')
      .query({ name }),

  getEffect: (effectId) =>
    http('api/effect/getAttribute')
      .method('get')
      .query({ effectId })
}
