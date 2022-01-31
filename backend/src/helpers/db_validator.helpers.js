const { employeeModel, categoryModel } = require("../models");

/**
 * @description Validate if email is registered in data base
 * @param {*} email
 * @author Camilo Morales Sanchez
 */
const validateExistingEmail = async (email) => {
  try {
    const employee = await employeeModel.findOne({ email });
    if (employee) {
      throw new Error(
        `The email ${email} is already registered in the database`
      );
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const validateCategory = async (categoryId) => {
  try {
    const category = await categoryModel.findById(categoryId);
    if (!category) {
      throw new Error("Category not found in data base");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  validateExistingEmail,
  validateCategory
};
