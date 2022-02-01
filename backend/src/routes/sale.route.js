const { Router } = require("express");
const { check, body } = require("express-validator");
const {
  listSales,
  deleteSale,
  createSale,
  updateSale,
} = require("../controller/sales.controller");
const { validateCustomer, validateProduct } = require("../helpers");
const { validateJWT, checkFields } = require("../middlewares");
const { validateRoleRouteSales } = require("../middlewares/validate_role");

const route = Router();

route.get("/", [validateJWT, validateRoleRouteSales], listSales);

route.delete(
  "/:id",
  [
    validateJWT,
    validateRoleRouteSales,
    check("id", "invalid mongo id").isMongoId(),
    checkFields,
  ],
  deleteSale
);

route.post(
  "/",
  [
    validateJWT,
    validateRoleRouteSales,
    check("customer", "customer is not valid mongoId")
      .isMongoId()
      .if(check("customer").isMongoId())
      .custom(validateCustomer),
    check("total", "total is required").isNumeric().notEmpty(),
    check("details", "details is not array").isArray(),
    body("details.*.product", "product is not valid mongoId")
      .isMongoId()
      .if(body("details.*.product").isMongoId())
      .custom(validateProduct),
    body("details.*.quantity").notEmpty().isNumeric(),
    body("details.*.subtotal").notEmpty().isNumeric(),
    checkFields,
  ],
  createSale
);

route.put(
  "/:id",
  [
    validateJWT,
    validateRoleRouteSales,
    check("id", "invalid mongo id").isMongoId(),
    check("customer")
      .if(check("customer").exists())
      .isMongoId()
      .withMessage("invalid mongo id")
      .if(check("customer").isMongoId())
      .custom(validateCustomer),
    check("total")
      .if(check("total").exists())
      .isNumeric()
      .withMessage("total is not numeric"),

    check("details").if(check("details").exists()).isArray(),

    body("details.*.product")
      .if(check("details").exists())
      .isMongoId()
      .if(check("details").isMongoId())
      .custom(validateProduct),
    body("details.*.quantity").if(check("details").exists()).isNumeric(),
    body("details.*.subtotal").if(check("details").exists()).isNumeric(),
    checkFields,
  ],
  updateSale
);

module.exports = route;
