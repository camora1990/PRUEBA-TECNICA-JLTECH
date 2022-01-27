const { Router } = require("express");
const { check } = require("express-validator");
const {
  listEmployees,
  register,
  deleteEmployee,
  updateEmployee,
} = require("../controller");
const { validateExistingEmail } = require("../helpers");
const { checkFields } = require("../middlewares/check_fields.middleware");
const { validateRoleRouteEmployees } = require("../middlewares/validate_role");
const { validateJWT } = require("../middlewares/validations.middleware");

const route = Router();

route.delete(
  "/:id",
  [
    validateJWT,
    validateRoleRouteEmployees,
    check("id", "id is not a valid mongo id").isMongoId(),
    checkFields,
  ],
  deleteEmployee
);

route.get("/", [validateJWT, validateRoleRouteEmployees], listEmployees);

route.post(
  "/",
  [
    validateJWT,
    validateRoleRouteEmployees,
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .if(check("email").exists())
      .custom(validateExistingEmail),
    check("name", "name is required").notEmpty(),
    check("contact", "contact is required").notEmpty(),
    check("address", "address is required").notEmpty(),
    check("password")
      .notEmpty()
      .withMessage("password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "i"
      )
      .withMessage(
        "The password must have a minimum of 8 characters, letters, numbers and special characters."
      ),
    check(
      "role",
      "Invalid role [ADMINISTRATOR, SELLER, HUMAN RESOURCES, WAREHOUSEMAN]"
    )
      .if(check("role").exists())
      .isIn(["ADMINISTRATOR", "SELLER", "HUMAN RESOURCES", "WAREHOUSEMAN"]),
    checkFields,
  ],
  register
);

route.put(
  "/:id",
  [
    validateJWT,
    validateRoleRouteEmployees,
    check("id", "invalid mongo id").isMongoId(),
    check("password")
      .if(check("password").exists())
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "i"
      )
      .withMessage(
        "The password must have a minimum of 8 characters, letters, numbers and special characters."
      ),
    check(
      "role",
      "Invalid role [ADMINISTRATOR, SELLER, HUMAN RESOURCES, WAREHOUSEMAN]"
    )
      .if(check("role").exists())
      .isIn(["ADMINISTRATOR", "SELLER", "HUMAN RESOURCES", "WAREHOUSEMAN"]),
    checkFields,
  ],
  updateEmployee
);

module.exports = route;
