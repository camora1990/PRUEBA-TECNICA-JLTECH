const { employeeModel } = require("../models");

/**
 * @description Validate if email is registered in data base
 * @param {*} email
 * @author Camilo Morales Sanchez
 */
const validateExistingEmail = async (email) => {
  try {
    const employee = await employeeModel.findOne({ email });
    if (employee) {
      throw new Error(`The email ${email} is already registered in the database`);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  validateExistingEmail,
};
