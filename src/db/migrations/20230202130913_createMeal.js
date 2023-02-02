/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable('meals', (table) => {
      table.increments('meal_id').primary();
      table.string('meal_name');
      table.text('meal_description');
      table.timestamps(true, true); // Adds created_at and updated_at
   });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTable('meals');
};
