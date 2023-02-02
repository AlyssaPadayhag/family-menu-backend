const router = require("express").Router({ mergeParams: true });
const controller = require("./meals.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:mealId([0-9]+)").get(controller.read).all(methodNotAllowed);

module.exports = router;