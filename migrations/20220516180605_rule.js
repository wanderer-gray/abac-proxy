/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable('rule', (table) => {
    table.uuid('ruleId').primary()
    table.string('title').notNullable().unique()
    table.uuid('effectId').notNullable()
    table.integer('targetId')
    table.integer('conditionId').notNullable()
    table.string('namespaceName')

    table
      .foreign('effectId')
      .references('effect.effectId')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table
      .foreign('targetId')
      .references('target.targetId')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table
      .foreign('conditionId')
      .references('condition.conditionId')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = (knex) =>
  knex.schema.dropTable('rule')
