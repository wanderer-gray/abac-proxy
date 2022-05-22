/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable('policy', (table) => {
    table.uuid('policyId').primary()
    table.string('title').notNullable().unique()
    table.integer('targetId').notNullable()
    table.integer('algorithmRuleId').notNullable()
    table.string('namespaceName')

    table
      .foreign('targetId')
      .references('target.targetId')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table
      .foreign('algorithmRuleId')
      .references('algorithmRule.algorithmRuleId')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = (knex) =>
  knex.schema.dropTable('policy')
