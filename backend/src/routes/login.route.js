const { Router } = require("express");
const { login } = require("../controller");
const { check } = require("express-validator");
const { checkFields } = require("../middlewares/check_fields.middleware");
const { validateCredentials } = require("../middlewares");

const route = Router();

route.post(
  "/",
  [
    check("email").notEmpty().withMessage("email is required").isEmail(),
    check("password", "password is required").notEmpty(),
    checkFields,
    validateCredentials
  ],
  login
);

module.exports = route;
