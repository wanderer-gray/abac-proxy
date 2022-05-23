/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable('condition', (table) => {
    table.uuid('conditionId').primary()
    table.string('title').notNullable().unique()
    table.text('source').notNullable()
    table.text('code').notNullable()
  })

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = (knex) =>
  knex.schema.dropTable('condition')
