/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable('user', (table) => {
    table.uuid('userId').primary()
    table.string('nickname').notNullable().unique()
    table.string('salt', 32).notNullable()
    table.string('hash', 128).notNullable()
  })

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = (knex) =>
  knex.schema.dropTable('user')
