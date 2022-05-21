const uuid = require('../uuid')

const effect = [
  { name: 'permit' },
  { name: 'deny' }
].map((data) => {
  return {
    effectId: uuid(),
    ...data
  }
})

const algorithmRule = [
  { name: 'deny-overrides' },
  { name: 'permit-overrides' },
  { name: 'first-applicable' },
  { name: 'ordered-deny-overrides' },
  { name: 'ordered-permit-overrides' },
  { name: 'deny-unless-permit' },
  { name: 'permit-unless-deny' }
].map((data) => {
  return {
    algorithmRuleId: uuid(),
    ...data
  }
})

const algorithmPolicy = [
  { name: 'deny-overrides' },
  { name: 'permit-overrides' },
  { name: 'first-applicable' },
  { name: 'only-one-applicable' },
  { name: 'ordered-deny-overrides' },
  { name: 'ordered-permit-overrides' },
  { name: 'deny-unless-permit' },
  { name: 'permit-unless-deny' }
].map((data) => {
  return {
    algorithmPolicyId: uuid(),
    ...data
  }
})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  Promise.all([
    knex('effect')
      .insert(effect),
    knex('algorithmRule')
      .insert(algorithmRule),
    knex('algorithmPolicy')
      .insert(algorithmPolicy)
  ])

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = (knex) =>
  Promise.all([
    knex('effect')
      .whereIn('name', effect.map(({ name }) => name))
      .delete(),
    knex('algorithmRule')
      .whereIn('name', algorithmRule.map(({ name }) => name))
      .delete(),
    knex('algorithmPolicy')
      .whereIn('name', algorithmPolicy.map(({ name }) => name))
      .delete()
  ])
