const { Router } = require("express");
const {
  createCustomer,
  deleteCustomer,
  listCustomer,
  updateCustomer,
} = require("../controller/customer.controller");
const { check } = require("express-validator");
const { checkFields } = require("../middlewares/check_fields.middleware");
const { validateJWT } = require("../middlewares/validations.middleware");
const { validateRoleRouteCustomers } = require("../middlewares/validate_role");

const route = Router();

route.post(
  "/",
  [
    validateJWT,
    validateRoleRouteCustomers,
    check("name", "name is required").notEmpty(),
    check("contact", "contact is required").notEmpty(),
    check("address", "address is required").notEmpty(),
    check("email", "Enter valid email").isEmail(),
    checkFields,
  ],
  createCustomer
);

route.delete(
  "/:id",
  [
    validateJWT,
    validateRoleRouteCustomers,
    check("id", "id is not valid mongoid").isMongoId(),
    checkFields,
  ],
  deleteCustomer
);

route.get("/", [validateJWT, validateRoleRouteCustomers], listCustomer);

route.put(
  "/:id",
  [
    validateJWT,
    validateRoleRouteCustomers,
    check("id", "id is not valid mongoid").isMongoId(),
    check("email")
      .if(check("email").exists())
      .isEmail()
      .withMessage("Enter valid email"),
    checkFields,
  ],
  updateCustomer
);

module.exports = route;
