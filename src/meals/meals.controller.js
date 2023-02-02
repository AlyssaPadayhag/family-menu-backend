const mealsService = require('./meals.service');
const hasProperties = require('../errors/hasProperties');
const hasRequiredProperties = hasProperties("meal_name", "meal_description");
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const VALID_PROPERTIES = [
   "meal_name",
   "meal_description",
];

async function list(req, res, next) {
   const data = await mealsService.list();
   res.json({ data });
}

function read(req, res) {
   const { meal: data } = res.locals;
   res.json({ data });
}

async function create(req, res, next) {
const data = await mealsService.create(req.body.data);
res.status(201).json({ data });
}

async function update(req, res, next) {
   const updatedMeal = {
      ...req.body.data,
      meal_id: res.locals.meal.meal_id,
   };
   const data = await mealsService.update(updatedMeal);
   res.json({ data });
}

async function destroy(req, res, next) {
   const { meal } = res.locals;
   await mealsService.delete(meal.meal_id);
   res.sendStatus(204);
}

async function mealExists(req, res, next) {
   const meal = await mealsService.read(req.params.mealId);
   if (product) {
      res.locals.meal = meal;
      return next();
   }
   next({ status: 404, message: `Meal cannot be found.`});
}

function hasOnlyValidProperties(req, res, next) {
   const { data = {} } = req.body;

   const invalidFields = Object.keys(data).filter(
      (field) => !VALID_PROPERTIES.includes(field)
   );

   if (invalidFields.length) {
      return next({
         status: 400,
         message: `Invalid field(s): ${invalidFields.join(', ')}`,
      });
   }
   next();
}

module.exports = {
   list: asyncErrorBoundary(list),
   read: [asyncErrorBoundary(mealExists), read],
   create: [hasOnlyValidProperties, hasRequiredProperties, asyncErrorBoundary(create)],
   update: [asyncErrorBoundary(mealExists), hasOnlyValidProperties, hasRequiredProperties, asyncErrorBoundary(update)],
   delete: [asyncErrorBoundary(mealExists), asyncErrorBoundary(destroy)],
};