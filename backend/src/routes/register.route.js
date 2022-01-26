const { Router } = require("express");
const { register } = require("../controller");
const { check } = require("express-validator");
const { checkFields } = require("../middlewares/check_fields.middleware");
const { validateExistingEmail } = require("../helpers");

const route = Router();

route.post(
  "/",
  [
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .if(check("email").exists())
      .custom(validateExistingEmail),
    check("name", "name is required").notEmpty(),
    check("contact", "name is required").notEmpty(),
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

module.exports = route;
