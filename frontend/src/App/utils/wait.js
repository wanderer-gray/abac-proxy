export default async function wait (promises) {
  const result = await Promise.allSettled(promises)

  return result
    .filter(({ status }) => status === 'fulfilled')
    .map(({ value }) => value)
}
