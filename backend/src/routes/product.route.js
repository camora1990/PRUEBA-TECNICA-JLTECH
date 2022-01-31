const { Router } = require("express");
const {
  createProduct,
  listProducts,
  deleteProduct,
  updateProduct,
} = require("../controller");
const { check } = require("express-validator");
const { validateCategory } = require("../helpers");
const {
  validateJWT,
  validateImages,
} = require("../middlewares/validations.middleware");
const { validateRoleRouteProducts } = require("../middlewares/validate_role");
const { checkFields } = require("../middlewares/check_fields.middleware");

const route = Router();

route.get("/", [validateJWT, validateRoleRouteProducts], listProducts);

route.post(
  "/",
  [
    validateJWT,
    validateRoleRouteProducts,
    validateImages,
    check("name", "name is required").notEmpty(),
    check("price", "price is required  greater than zero").notEmpty(),
    check("category", "insert valid mongo id")
      .isMongoId()
      .if(check("category").isMongoId())
      .custom(validateCategory),
    checkFields,
  ],
  createProduct
);

route.delete(
  "/:id",
  [
    validateJWT,
    validateRoleRouteProducts,
    check("id", "id is not valid mongoId").isMongoId(),
    checkFields,
  ],
  deleteProduct
);

route.put(
  "/:id",
  [
    validateJWT,
    validateRoleRouteProducts,
    check("id", "id is not valid mongoId").isMongoId(),
    check("category")
      .if(check("category").exists())
      .isMongoId()
      .withMessage("id is not valid mongoId")
      .if(check("category").isMongoId())
      .custom(validateCategory),
    checkFields,
  ],
  updateProduct
);

module.exports = route;
