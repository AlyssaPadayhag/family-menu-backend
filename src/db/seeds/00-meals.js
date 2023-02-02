/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const meals = require('../fixtures/meals');

exports.seed = function (knex) {
  return knex
    .raw('TRUNCATE TABLE meals RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('meals').insert(meals);
    });
};