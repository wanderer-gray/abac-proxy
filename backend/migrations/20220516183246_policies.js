/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable('policies', (table) => {
    table.uuid('policySetId').notNullable()
    table.uuid('policyId').notNullable()

    table
      .foreign('policySetId')
      .references('policySet.policySetId')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table
      .foreign('policyId')
      .references('policy.policyId')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table.primary(['policyId', 'policyId'])
  })

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = (knex) =>
  knex.schema.dropTable('policies')
