/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable('rules', (table) => {
    table.uuid('policyId').notNullable()
    table.uuid('ruleId').notNullable()

    table
      .foreign('policyId')
      .references('policy.policyId')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table
      .foreign('ruleId')
      .references('rule.ruleId')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table.primary(['policyId', 'ruleId'])
  })

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = (knex) =>
  knex.schema.dropTable('rules')
