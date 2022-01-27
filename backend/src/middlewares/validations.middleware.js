const { request, response } = require("express");
const { generalMessage, comparePassword } = require("../helpers");
const { employeeModel } = require("../models");
const jwt = require("jsonwebtoken");

/**
 * @description validate if user and password aren correct
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 * @author Camilo Morales Sanchez
 */
const validateCredentials = async (req = request, res = response, next) => {
  const { email, password } = req.body;
  try {
    const employee = await employeeModel.findOne({ email });
    if (!employee) {
      generalMessage(res, 401, false, "username or password are invalid");
      return;
    }
    const isValidPassword = await comparePassword(password, employee.password);
    if (!isValidPassword) {
      generalMessage(res, 401, false, "username or password are invalid");
      return;
    }
    req.employee = employee;
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
  next();
};

/**
 * @description this function checks if the token is valid
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

const validateJWT = async (req = request, res = response, next) => {
  if (!req.header("Authorization")) {
    generalMessage(res, 401, false, "unauthorized user");
    return;
  }
  const token = req.header("Authorization").split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.PRIVATE_KEY);
    const employee = await employeeModel.findById(payload.id);
    if (!employee) {
      generalMessage(res, 400, false, "Invalid user");
      return;
    }
    req.payload = {
      id: employee._id,
      role: employee.role,
      name: employee.name,
      email: employee.email,
    };
  } catch (error) {
    const message = token ? "Invalid token" : error.message;
    generalMessage(res, 401, false, message);
    return;
  }

  next();
};

module.exports = {
  validateCredentials,
  validateJWT,
};
