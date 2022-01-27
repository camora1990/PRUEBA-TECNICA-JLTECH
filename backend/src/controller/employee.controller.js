const { request, response } = require("express");
const { generalMessage } = require("../helpers");
const { employeeModel } = require("../models");

const listEmployees = async (req = request, res = response) => {
  const { limit = 10, page = 1 } = req.query;
  try {
    const { docs: employees, ...information } = await employeeModel.paginate(
      {},
      { limit, page }
    );
    generalMessage(res, 200, true, "list employees", {employees,information});
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

module.exports = {
  listEmployees,
};
