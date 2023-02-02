const knex = require('../db/connection');

function list() {
   return knex('meals').select('*');
}

function read(mealId) {
   return knex('meals').select('*').where({ meal_id: mealId });
}

function create(meal) {
   return knex('meals')
      .insert(meal)
      .returning('*')
      .then((createdRecords) => createdRecords[0]);
}

function update(updatedMeal) {
   return knex('meals')
      .select('*')
      .where({ meal_id: updatedMeal.meal_id })
      .update(updatedMeal, '*');
}

function destroy(meal_id) {
   return knex('meals').where({ meal_id }).del();
}


module.exports = {
   list,
   read,
   create,
   update,
   delete: destroy,
};