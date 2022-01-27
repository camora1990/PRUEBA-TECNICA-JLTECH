const { Router } = require("express");
const { check } = require("express-validator");
const {
  listCategories,
  updateCategory,
  createCategory,
} = require("../controller/category.controller");
const { checkFields } = require("../middlewares");
const { validateRoleRouteProducts } = require("../middlewares/validate_role");
const { validateJWT } = require("../middlewares/validations.middleware");

const route = Router();

route.get("/", [validateJWT, validateRoleRouteProducts], listCategories);

route.post("/", [validateJWT, validateRoleRouteProducts], createCategory);

route.put(
  "/:id",
  [
    validateJWT,
    validateRoleRouteProducts,
    check("id", "id is not valid mongoid").isMongoId(),
    checkFields,
  ],
  updateCategory
);

module.exports = route;
