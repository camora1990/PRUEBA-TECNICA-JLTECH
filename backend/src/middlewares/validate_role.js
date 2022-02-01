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

/**
 * @description validate role route customer
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const validateRoleRouteCustomers = (req = request, res = response, next) => {
  const validRoles = ["ADMINISTRATOR", "HUMAN RESOURCES", "SELLER"];

  const { role } = req.payload;
  if (!validRoles.includes(role)) {
    generalMessage(res, 401, false, "unauthorized user");
    return;
  }
  next();
};

/**
 * @description validate role route products and categories
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
 const validateRoleRouteProducts = (req = request, res = response, next) => {
  const validRoles = ["ADMINISTRATOR", "WAREHOUSEMAN"];

  const { role } = req.payload;
  if (!validRoles.includes(role)) {
    generalMessage(res, 401, false, "unauthorized user");
    return;
  }
  next();
};

/**
 * @description validate role route sales
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
 const validateRoleRouteSales = (req = request, res = response, next) => {
  const validRoles = ["ADMINISTRATOR", "SELLER"];

  const { role } = req.payload;
  if (!validRoles.includes(role)) {
    generalMessage(res, 401, false, "unauthorized user");
    return;
  }
  next();
};

module.exports = {
  validateRoleRouteCustomers,
  validateRoleRouteEmployees,
  validateRoleRouteProducts,
  validateRoleRouteSales
};
