const { request, response } = require("express");
const { generalMessage } = require("../helpers");

/**
 * @description validate role route employees
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateRoleRouteEmployees = (req = request, res = response, next) => {
  const validRoles = ["ADMINISTRATOR", "HUMAN RESOURCES"];

  const { role } = req.payload;
  if (!validRoles.includes(role)) {
    generalMessage(res, 401, false, "unauthorized user");
    return;
  }
  next();
};

module.exports={
    validateRoleRouteEmployees
}
