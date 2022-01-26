const { request, response } = require("express");
const { generalMessage, comparePassword } = require("../helpers");
const { employeeModel } = require("../models");

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

module.exports = {
  validateCredentials,
};
