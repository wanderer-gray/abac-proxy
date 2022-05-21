/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable('policySet', (table) => {
    table.uuid('policySetId').primary()
    table.string('title').notNullable().unique()
    table.integer('targetId').notNullable()
    table.integer('algorithmPolicyId').notNullable()
    table.string('namespaceName')

    table
      .foreign('targetId')
      .references('target.targetId')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table
      .foreign('algorithmPolicyId')
      .references('algorithmPolicy.algorithmPolicyId')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = (knex) =>
  knex.schema.dropTable('policySet')
